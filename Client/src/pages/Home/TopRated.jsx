import React, { useState,useEffect } from 'react'
import DisplayCards from '../../components/DisplayCards'

const TopRated = () => {

    const [data, setData] = useState([])

    const [types, setTypes] = useState("movie")

    const apiKey = `d8d0bca9bbe0ddf613286684fa77259c`
    const imagePath = `https://image.tmdb.org/t/p/w500/`

    let URI = `https://api.themoviedb.org/3/${types}/top_rated?api_key=${apiKey}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URI)
            const data = await response.json()
            setData(data.results)
        }
        fetchData()
    }, [types])

    const PopularHeading = () => {
        return (
            <div className='popular-heading'>
                <h1 className='primary-title'>Top Rated</h1>
                <div>
                    <button className={types == "movie" ? "clicked-button" : ""} onClick={() => setTypes("movie") }>Movies</button>
                    <button className={types == 'tv' ? "clicked-button" : ""} onClick={() => setTypes("tv")}>TV-Shows</button>
                </div>
            </div>
        )
    }

    if(data.length != 0) {
        return (
          <div className='popular'>
                  <PopularHeading />
                  <DisplayCards data={data} swiper='include' />
          </div>
        )
    }
}

export default TopRated