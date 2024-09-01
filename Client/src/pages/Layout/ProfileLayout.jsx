import React from 'react'
import ProfileOptions from '../Profile/ProfileOptions'
import { Outlet } from 'react-router-dom'



const ProfileLayout = () => {
  return (
    <div className='profile-layout'>
        <ProfileOptions />
        <Outlet />
    </div>
  )
}

export default ProfileLayout