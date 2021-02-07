import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Feed from '../feed/Feed'
import UserHeader from './header/UserHeader'
import UserPhotoPost from './photo/UserPhotoPost'
import UserStats from './stats/UserStats'
import NotFound from '../error/NotFound'
import Head from '../helper/Head'
import { useSelector } from 'react-redux'

const User = () => {
  const { data } = useSelector(state => state.user)

  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default User;