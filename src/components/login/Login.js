import React from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './Login.module.css'

import LoginForm from './form/LoginForm'
import LoginCreate from './create/LoginCreate'
import LoginPasswordLost from './password/lost/LoginPasswordLost'
import LoginPasswordReset from './password/reset/LoginPasswordReset'
import NotFound from '../error/NotFound'
import Head from '../helper/Head'
import Loading from '../helper/Loading'

const Login = () => {
  const { data, loading } = useSelector(state => state.user)

  if (loading) return <Loading />
  if (data) return <Navigate to="/conta" />
  return (
    <section className={styles.login}>
      <Head title="Login" />
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  )
}

export default Login;