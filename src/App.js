import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/helper/ProtectedRoute';
import { UserStorage } from './UserContext'
import './App.css';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Home from './components/home/Home'
import Login from './components/login/Login'
import User from './components/user/User'

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <UserStorage>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <ProtectedRoute path="/conta/*" element={<User />} />
            </Routes>
            <Footer />
          </UserStorage>
        </BrowserRouter>
      </>
    )
  }
}

export default App;