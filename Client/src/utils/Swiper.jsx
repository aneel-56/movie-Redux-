import React from 'react'
import { Swiper} from 'swiper/react';
import SliderSettings from './SliderSettings';

const SwiperParent = ({children}) => {
  return (
        <Swiper
        {...SliderSettings}
        >
            {children}
        </Swiper>
  )
}

export default SwiperParent