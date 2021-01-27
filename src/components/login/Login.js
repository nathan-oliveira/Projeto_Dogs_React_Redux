import React from 'react'
import { UserContext } from '../../UserContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import styles from './Login.module.css'

import LoginForm from './form/LoginForm'
import LoginCreate from './create/LoginCreate'
import LoginPasswordLost from './password/lost/LoginPasswordLost'
import LoginPasswordReset from './password/reset/LoginPasswordReset'
import NotFound from '../error/NotFound'
import Head from '../helper/Head'

const Login = () => {
  const { login } = React.useContext(UserContext)

  if (login === true) return <Navigate to="/conta" />

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