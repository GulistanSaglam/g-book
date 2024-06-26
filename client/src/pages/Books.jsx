import React,{useEffect, useState} from 'react'
import Book from '../components/Book'
import style from './books.module.css'
import Navbar from '../components/Navbar'

const Books = () => {

const [books, setBooks] = useState([]);
useEffect(() => {
  fetch('http://localhost:4000/books').
  then(response => response.json().then(books => {
      setBooks(books)
  }))
}, [])
  return (
    <div>
         <Navbar/>
         <div className={style.container}>
   
   <h2>List of the Books</h2>
   <div className={style.book__container}>
     {books && books.map((book,_id) => (
       <Book key={book._id} book={book}/>
     ))}

   </div>
 </div>
    </div>

  )
}

export default Books