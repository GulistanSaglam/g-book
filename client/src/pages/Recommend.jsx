import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './recommend.module.css';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar'

const Recommend = () => {
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState()
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);


  async function recommend(e) {
     e.preventDefault();
     const data = new FormData();
     data.set('title', title);
     data.set('file', files[0]);
     data.set('content', content);
     const response = await fetch('http://localhost:4000/recommend', {
      method:'POST',
      body: data,
      credentials: 'include'
     })

     if(response.ok){
      setRedirect(true);

     }else{
      console.log('Something went wrong');
     }
  }

  if(redirect) {
    return <Navigate to={'/books'}/>
  }

  return (
    <div>
      <Navbar/>
      <div className={style.container}>
      <h2>Recommend a Book</h2>
    <form onSubmit={recommend}> 
      <input type='title' 
      placeholder='Title'
      className={style.title}
      value={title}
      onChange={(e) => setTitle(e.target.value)}/>
      <input 
      type='file' 
      onChange={(e) => setFiles(e.target.files)}/>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <div className={style.buttons}>
      <button type='submit'>Recommend</button>
      </div>
    </form>
    </div>
    </div>

  )
}

export default Recommend