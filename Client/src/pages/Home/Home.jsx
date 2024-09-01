import React from 'react'
import Trending from './Trending'
import Popular from './Popular'
import './Home.css'
import TopRated from './TopRated'
import Hero from './Hero'

const Home = () => {
  return (
    <div className='home'>      
        <Hero />
        <Trending />
        <Popular />
        <TopRated />
    </div>
  )
}

export default Home