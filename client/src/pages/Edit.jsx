import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from './recommend.module.css';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

const Edit = () => {
const {id} = useParams()
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState()
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:4000/books/${id}`).then((response) => {
        response.json().then((bookInfo) => {
            setTitle(bookInfo.title);
            setContent(bookInfo.content);
        });
    });
  }, [])

  async function updateBook(e){
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('id', id);

    if(files?.[0]){
        data.set('file', files?.[0]);
    }
   const response = await fetch(`http://localhost:4000/books/${id}`, {
        method:'PUT',
        body:data,
        credentials:'include'
    });

    console.log(response)

    if(response.ok) {
        setRedirect(true)
    }
  }

  if(redirect) {
    return <Navigate to={'/books/'+id}/>
  }

  return (
    <div>
      <Navbar/>

      <div className={style.container}>
      <h2>Update a Book</h2>
        <form onSubmit={updateBook}> 
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
            <button>Update</button>
         </div>
        </form>
      </div>
    </div>

  )
}

export default Edit