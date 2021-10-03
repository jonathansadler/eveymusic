import { Link } from 'react-router-dom'
import { MusicalNotes } from 'react-ionicons'
import { Heart } from 'react-ionicons'
import { Person } from 'react-ionicons'

const Footer = () => {
  return (
    <footer>
      <Link to='/'>
      <MusicalNotes className="space-buttons-bottom"
        color={"orange"} 
        title={"chart"}
        height="50px"
        width="30px"
      /></Link>

      <Link to='/fav'>
      <Heart className="space-buttons-bottom"
        color={"orange"} 
        title={"fav"}
        height="50px"
        width="30px"
      /></Link>

      {/*
      <Link to='/sett'>
      <Person className="space-buttons-bottom"
        color={"orange"} 
        title={"sett"}
        height="50px"
        width="30px"
      /></Link>
      */}

      {/*<Link to='/about'>About</Link>*/}

    </footer>
  )
}

export default Footer


