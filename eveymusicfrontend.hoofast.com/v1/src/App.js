import { useState, useEffect } from 'react'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

//import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import { ClientContext, GraphQLClient } from 'graphql-hooks'

import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import AudioItems from './components/AudioItems'
import SaveFav from './components/SaveFav'
//import About from './components/About'


import { PlaySkipForward } from 'react-ionicons'
import { PlaySkipBack } from 'react-ionicons'

import { MusicalNotes } from 'react-ionicons'
import { Heart } from 'react-ionicons'
import { Person } from 'react-ionicons'


//<Route path='/about' component={About} />


// apollo client
/*
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})
*/

const client = new GraphQLClient({ url: 'http://3.13.34.21:1337/graphql' })


const App = () => { 

var loadUiId = null;
//var loadUiId= soundCloudItems.length;

  

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])      

  const [soundCloudItems, setSoundcloudItems] = useState([])

  var [AppUser, setAppUser] = useState([])

  //var [FavsT, setFavsT] = useState([])

  useEffect(() => {


    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()


    const getSongs = async () => {
      const songsFromServer = await fetchSongs()
      setSoundcloudItems(songsFromServer)
    }

    getSongs()
    

    const getUser = async () => {
      const userFromServer = await fetchAppUser()
      setAppUser(userFromServer)
    }

    getUser()


    const authUser = async () => {
      

      if (  (localStorage.getItem("user"))  == null ){

        //console.log(manyUsers[0].username)

        var userAssign;
        userAssign = Math.floor(100000 + Math.random() * 900000);

        //
        addAppUser({"username":userAssign});
        //

        var transferName = userAssign;


        const userFromServer = await fetchAppUser();
        var manyUsers = userFromServer;

        var checkUsers = manyUsers;

        var checkUsersCount = manyUsers.length;

        //console.log(checkUsersCount);

        //console.log(checkUsers);

        //console.log(transferName);

        localStorage.setItem("user", transferName);

        //var x = localStorage;

            //for (var i = 0; i < checkUsersCount; i++, transferName ) {

              //if (checkUsers[i].username == transferName ) {

                //localStorage.setItem("user", checkUsers[i]);

              //} 

            //}   
            

      } 

      /*

      else if (  (localStorage.getItem("user"))  != null ){

          var getItemAlert = localStorage.getItem("user");




          const userFromServer = await fetchAppUser();
          var manyUsers = userFromServer;

          var getSongFavs = manyUsers;

          
          for (var i = 0; i < getSongFavs.length; i++ ) {

            if (getSongFavs[i].username == getItemAlert){
             
              
              var ScNoTemp = getSongFavs[i].favs;

              console.log(ScNoTemp)

              var ScNoTempArray = [];

              for (var i = 0; i < ScNoTemp.length; i++) {

                 ScNoTempArray.push(ScNoTemp[i].id)


              
              }  


              localStorage.setItem("FavsTest", JSON.stringify(ScNoTempArray));
            
            }  

          } 

          
          


      }

      */

    }

    authUser()

    /*
    const sendFavs = async () => {
      //const userFromServer = await fetchAppUser()

      var favsFromStorage = JSON.parse( localStorage.getItem("FavsTest") );

      console.log(favsFromStorage)

      setFavsT(favsFromStorage);
    }

    sendFavs()
    */


  }, [])



  const fetchSongs = async () => {
    const res = await fetch('http://3.13.34.21:1337/Songs')
    const data = await res.json()

    return data
  }

  const fetchAppUser = async () => {
    const res = await fetch('http://3.13.34.21:1337/App-users')
    const data = await res.json()

    return data
  }



  const addAppUser = async (taska) => {
    const res = await fetch('http://3.13.34.21:1337/App-users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taska),
    })

    //const data = await res.json()

    //setAppUser([...AppUser, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }


  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://3.13.34.21:1337/Tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://3.13.34.21:1337/Tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://3.13.34.21:1337/Tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://3.13.34.21:1337/Tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://3.13.34.21:1337/Tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
  



  return (
    <Router>   
      <ClientContext.Provider value={client}>
      <div className='container'>
        

        <div className='sticky-top' style={{marginBottom:'10px'}}>
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />
        </div>

        <Switch>
          <Route path="/fav">
              
              <SaveFav/>
          </Route>
          <Route path="/sett">
            <></>
          </Route>
          <Route path="/" exact >
              
              <AudioItems/>
             
          </Route>
        </Switch>

        <div className='sticky-bottom'>
          <Footer />
        </div>
      
      
      </div>

      </ClientContext.Provider>
    </Router>





  )

}

export default App
