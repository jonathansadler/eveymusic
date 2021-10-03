//import React from 'react';
//import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';

import { PlaySkipForward } from 'react-ionicons'
import { Heart } from 'react-ionicons'

import JrsScWidget from 'a-jrs-sc-widget';

import $ from 'jquery';

//import { useQuery, useMutation, gql } from '@apollo/client';

import { useQuery, useMutation } from 'graphql-hooks'



//import jrswidget from './staticsoundcloudapi/api.js';
       
//1049717548
//16719183

 //300 height


/*           
<h3>Artist- {currElement.artist}</h3>
<h3>{currElement.songName}</h3>
*/

//497085



const GET_SONGS = `
query GetUser($username: Long!) {
songs{
      id
      scNo
        poster{
          username
        }
      favs{
        song{
          id 
        }
      }
  } 
current:appUsers(where:{username:$username})
    {
      id
      username
    }  
}

`

const CREATE_FAV = `

mutation createFav( $songid: ID!, $app_user: ID!) {
  createFav(input:
   { data: {
     song:$songid , app_user:$app_user
  }}) {    
    fav{
      id
      song{
        id
      }
      app_user{
        id
      }
    }
    
  } 
}

`

//soundCloudItems

const AudioItems = ({soundCloudItems,loadUiId}) => {

  const [userId, setUserId] = useState([])

  //const [IStorage, setIStorage] = useState([])


  const { loading, error, data, refetch:refetchFavs} = useQuery(GET_SONGS, {
    variables: {
      username:userId
    }
  })


  //console.log(data)

  const [updateAppUser] = useMutation(CREATE_FAV)

  async function createFav(favid,current) {

    await updateAppUser({
      variables: {
         songid: favid, app_user:current
      },

    })

    //setUserId('')

    //setIStorage(data);

    refetchFavs();


  }






var SC = JrsScWidget.methodexpos(); 

var api ;

 var playerCurrentlyPlaying = {
     "api": null,
     "frameID": "ui-id-0"
 };
 var players = {
     "yt": {},
     "sc": {}
 };

var send = "next";




useEffect(() => {


  var sendUserId = function (){

      var fromStorage = JSON.parse( localStorage.getItem("user") );

      //console.log(fromStorage)
      
      setUserId(fromStorage);
  }

  sendUserId();



  //(function () {
     $(".soundcloud_embed iframe").each(function () {
         var frameid = $(this).attr('id');
         players["sc"][frameid] = {};
         players["sc"][frameid] = {
             "widget": SC.Widget(document.getElementById(frameid)),
                 "firstplay": true
         };
         players["sc"][frameid]["widget"].bind(SC.Widget.Events.READY, function () {
             players["sc"][frameid]["widget"].bind(SC.Widget.Events.PLAY, function () {
                 onSCPlay(frameid, SC.Widget.Events.PLAY);
             });
             players["sc"][frameid]["widget"].bind(SC.Widget.Events.PLAY_PROGRESS, function () {
                 onSCPlay(frameid, SC.Widget.Events.PLAY_PROGRESS);
             });
             players["sc"][frameid]["widget"].bind(SC.Widget.Events.FINISH, function () {
                send = "next";
                playNextPlayer(send);
                 //playNextPlayer();
             });
         });
     });
  //}());
     




});


  const fetchAppUser = async () => {
    const res = await fetch('http://localhost:1337/App-users')
    const data = await res.json()

    return data
  }


var nexttrackjr = function (){
  //alert(1)
  
  send = "next";

  playNextPlayer(send);

   //alert(2)

};

var prevtrackjr = function (){

  //send = "back" ;

  //playNextPlayer(send);

};




var playNextPlayer = function(send) {
  var nextFrameId = "ui-id-";
  var nextIdNum=parseInt(playerCurrentlyPlaying["frameID"].split("-").pop())+1;
  //var nextIdNumMinus=nextIdNum-1;   


  //var inc = 1;

  //var AmountScIframes = ($(".soundcloud_embed iframe").length);


  if (nextIdNum != null){
    
    nextFrameId="ui-id-"+nextIdNum;
  
  } else if (send == "next"){

    nextFrameId="ui-id-"+nextIdNum;
  
  }  

  /*

  function nextTracka() {

    if (inc < AmountScIframes){
      inc += 1;
    } else {
      inc = 0;
    }
    return inc;
  }
   
  function prevTracka() {
    if (inc > 1){
      inc -= 1;
    } else {
      inc = AmountScIframes;
    } 
     
    return inc;

  }

  */
     
     switch($("#"+nextFrameId).parent().attr('class')) {
         case "youtube_embed":
             api="yt";
             players[api][nextFrameId].playVideo();
             break;
         case "soundcloud_embed":
             
             api="sc";
             
             //players[api][nextFrameId]["widget"].play();
             SC.Widget(nextFrameId).play();
             break;
     }
     playerCurrentlyPlaying["api"]=api;
     playerCurrentlyPlaying["frameID"]=nextFrameId;

};


var pauseCurrentPlayer = function () {
     var api = playerCurrentlyPlaying["api"],
         frameid = playerCurrentlyPlaying["frameID"];

     switch (api) {
         case "yt":
             players[api][frameid].pauseVideo();
             break;
         case "sc":
             players[api][frameid]["widget"].pause();
             break;
     }
 };


//

var onSCPlay = function (frameid, event) {
     if (event == SC.Widget.Events.PLAY || players["sc"][frameid]["firstplay"] == true) {
         if (playerCurrentlyPlaying["api"] == "yt") {
             pauseCurrentPlayer();
         }
         playerCurrentlyPlaying["api"] = "sc";
         playerCurrentlyPlaying["frameID"] = frameid;
         players["sc"][frameid]["firstplay"] = false;
     }
 }; 

console.log(data);

  if (loading) return 'Loading...'
  if (error) return 'Please Refresh Browser'

  return (
    <>


        <div className="sticky-nextplayer">
            <PlaySkipForward 
              color={'orange'} 
              title={"playall"}
              height="25px"
              width="25px"
              onClick={
                ()=> nexttrackjr()
              }
            />
        </div>

        <div>
            {data.songs.map(({ id, scNo, favs }) => (
            
            <div key={scNo} className='soundcloud_embed' style={{ marginTop:'10px'}}>
              <iframe title="title" id={'ui-id-'+id} width="100%" height="220" scrolling="no" frameBorder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + scNo + '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}/>
              <div className='centerer'>
                  <Heart style ={{ }}
                    color={'red'} 
                    title={""}
                    height="25px"
                    width="25px"
                    onClick={ ()=>createFav( id, data.current[0].id ) }
                   />
                   <h5 style={{ color:'red'}}>
                   {favs.length}
                   </h5>
              </div>
            
            </div> 
            
            ))}
        </div>


    </>

  )
}

export default AudioItems


