import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

import { Bonfire } from 'react-ionicons'



const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className='header'>
        <div>
        <Bonfire
          color={'orange'} 
          beat 
          title={"defaultLogo"}
          height="30px"
          width="30px"
        />

        <h4 style={{fontWeight:'bold', color:'orange', marginLeft:'32px', marginTop:'-35px'}}>{title}</h4>
      </div>
 
{/*
      {location.pathname === '/' && (
       <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Post'}
          onClick={onAdd}
        />
      )}
*/}

    </header>
  )
}

Header.defaultProps = {
  title: 'EveyMusic',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
