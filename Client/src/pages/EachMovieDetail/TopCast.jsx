import React from 'react'
import { SwiperSlide } from 'swiper/react'
import { Swiper } from 'swiper/react'
import sliderSettingTopCast from '../../utils/SliderSettingTopCast'


const TopCast = (props) => {
    
    console.log("props", props)

    const imagePath = `https://image.tmdb.org/t/p/w500/`
  return (
    <div className='top-cast'>
        <h2 style={{color: "white", fontSize: "2rem", marginBottom: "0.6em", textAlign: "left"}}>Top Cast</h2>
        <Swiper {...sliderSettingTopCast}>
            {
                props.cast.cast && props.cast.cast.map((each) => {
                    return(
                        <SwiperSlide key={each.id} className='top-cast-member'>
                            <img src={each.profile_path ? imagePath + each.profile_path : "/avatar.png"} alt="" />
                            <h2 className='primary-title'>{each.original_name}</h2>
                            <h3 className='secondary-title'>{each.character}</h3>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    </div>
  )
}

export default TopCast