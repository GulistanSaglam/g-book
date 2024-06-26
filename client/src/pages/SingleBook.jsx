import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './singlebook.module.css'
import { useParams } from 'react-router-dom'
// import { format } from "date-fns";
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext';


const SinglePost = () => {
  const [bookInfo, setBookInfo] = useState()
  const {id} = useParams()
  useEffect(()=> {
    fetch(`http://localhost:4000/books/${id}`).then(
      response => {response.json().then(bookInfo => {
      setBookInfo(bookInfo)
    })}
   
  )}, [id])
   
 const {user} = useContext(AuthContext);
  return (
    <div>
      <Navbar/>
    <div className={style.container}>
  
  <img src={`http://localhost:4000/${bookInfo?.cover}`} alt='' />


 <div className={style.info}>
     <h1>{bookInfo?.title}</h1>
     {/* <span>{format(new Date(bookInfo?.createdAt), "yyyy-MM-dd, HH:mm")}</span> */}
     <p>By {bookInfo?.author.username} </p>
     <p dangerouslySetInnerHTML={{__html:bookInfo?.content}} className={style.content} />
 </div >


{user.id === bookInfo?.author._id && (
 <div className={style.buttons}>
  <Link to={`/edit/${bookInfo?._id}`}>
  <button>UPDATE</button>
  </Link>
</div>
)} 





</div>
    </div>

  )
}

export default SinglePost