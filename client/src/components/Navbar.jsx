import { Link } from 'react-router-dom'
import style from './navbar.module.css'
import { useContext } from 'react'
import {AuthContext} from '../context/AuthContext'


const Navbar = () => {

  const {user,dispatch} = useContext(AuthContext);
 
  const handleLogout = () => {
    dispatch({type:'LOGIN', payload:null })
  }
  return (
    <div className={style.container}>
      <nav className={style.nav}>
          <div>
            <Link to="/" className={style.logo}>G-Book</Link>
          </div>

          <div className={style.links}>
 
          {
            user && (
              <>
                <Link to="/books">Books</Link>
                 <Link to="/recommend">Recommend Book</Link>
                 <button onClick={handleLogout}>Logout ({user.username})</button>
              </>
            )
          }
          
           {
            !user && (
              <>
                           <Link to="/signup">Sign Up</Link>
                           <Link to="/login">Login</Link>
              </>
            )
           }

          </div>
      </nav>
    </div>
  )
}

export default Navbar