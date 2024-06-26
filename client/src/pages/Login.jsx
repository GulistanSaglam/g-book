import { useContext, useState } from 'react'
import style from './login.module.css'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar'


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {user, dispatch} = useContext(AuthContext)

 async function login(e) {
    e.preventDefault();
   fetch('http://localhost:4000/login' , {
      method:'POST',
      body:JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    }).then((response) => response.json().then((json)=>{
      setRedirect(true);
      dispatch({type:'LOGIN', payload:json })
    }))
   

  }

  if(redirect) {
    return <Navigate to={"/books"} />
  }

  return (
    <div>
      <Navbar/>
    <div className={style.container}>
        <h2>Login</h2>

        <form className={style.formContainer} onSubmit={login} >
        <input 
            type='text' 
            placeholder="Your username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input 
           type='password' 
          placeholder="Your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <button>Login</button>
        </form>
    </div>
    </div>

  )
}

export default Login