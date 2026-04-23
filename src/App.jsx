import React from 'react'
import Nav from './components/layout/Navbar'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Navbar from './components/layout/Navbar'
import OTPVerification from './pages/auth/OTPVerification'

export default function App() {
  return (
    <>
      <Navbar/>
      <LoginPage/>
      <RegisterPage/>
      <OTPVerification/>
    </>
  )
}
