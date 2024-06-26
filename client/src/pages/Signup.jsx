
import { useState } from 'react'
import style from './signup.module.css'
import Navbar from '../components/Navbar'
import { Navigate } from 'react-router-dom';



const Signup = () => {
const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [redirect, setRedirect] = useState(false);
const [message, setMessage] = useState('')

async function signup(e){
   e.preventDefault();
  const response =  await fetch('http://localhost:4000/signup', {
    method:'POST',
    body: JSON.stringify({username, password}),
    headers: {'Content-Type': 'application/json'}
   });

  //  console.log(response);
   if(response.ok){
    setMessage('You are signed successfully!')
    setTimeout(function() {
      setRedirect(true)
    },2500)
   }else{
    setMessage('Failed to sign up!')
   }
}

if(redirect) {
  return <Navigate to={'/login'} />
}
  
  return (
    <div>
   <Navbar/>
<div className={style.container}>
        <h2>Sign Up</h2>
        {message}
        <form className={style.formContainer} onSubmit={signup} >
            <input 
            type='text' 
            placeholder="Your username..."
            value={username}
            onChange={(e) => setUserName(e.target.value)}/>
            <input 
            type='password' 
            placeholder='Your password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            <button>Sign Up</button>
        </form>
    </div>
    </div>

  )
}

export default Signup