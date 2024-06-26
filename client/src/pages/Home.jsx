import React from 'react'
import style from './home.module.css'
import bookHero from '../images/bookHero.png'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className={style.container}>
      <Navbar/>
    </div>
  )
}

export default Home