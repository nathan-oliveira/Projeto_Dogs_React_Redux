import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { UserContext } from '../../UserContext'

import Feed from '../Feed/Feed'
import UserHeader from './header/UserHeader'
import UserPhotoPost from './photo/UserPhotoPost'
import UserStats from './stats/UserStats'

const User = () => {
  const { data } = React.useContext(UserContext)

  return (
    <section className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
      </Routes>
    </section>
  )
}

export default User;