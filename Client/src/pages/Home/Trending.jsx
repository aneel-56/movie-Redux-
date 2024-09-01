import React, { useEffect, useState } from 'react'
import DisplayCards from '../../components/DisplayCards'

const Trending = () => {

    const [data, setData] = useState([])
    const [time, setTime] = useState("day")
    
    const apiKey = `d8d0bca9bbe0ddf613286684fa77259c`

    const URI = `https://api.themoviedb.org/3/trending/all/${time}?api_key=${apiKey}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URI)
            const data = await response.json()
            setData(data.results)
        }
        fetchData()
    },[time])

    const TrendingHeading = () => {

        return (
            <div className='trending-heading'>
                <h1 className='primary-title'>Trending</h1>
                <div>
                    <button className={time == "day" ? "clicked-button" : ""} onClick={() => setTime("day")}>Day</button>
                    <button className={time == "week" ? "clicked-button" : ""} onClick={() => setTime("week")}>Week</button>
                </div>
            </div>
        )
    }

    if(data.length > 0) {
        return (
          <div className='trending'>
              <TrendingHeading />
              <div>
                <DisplayCards data={data} swiper="include" />
              </div>
          </div>
        )
    }
}

export default Trending