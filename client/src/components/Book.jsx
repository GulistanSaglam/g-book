import React from 'react'
import style from './book.module.css';
import { Link } from 'react-router-dom';


const Book = ({book}) => {
  return (

    <div className={style.container}>
    <Link to={`/books/${book._id}`}>
      <div className={style.up}>
        <img src={"http://localhost:4000/" +book.cover} alt=""></img>
      </div>
      </Link>
      <div className={style.down}>
        <h3>{book.title}</h3>
        <span>By {book.author.username}</span>
    </div>

    </div>


  )
}

export default Book