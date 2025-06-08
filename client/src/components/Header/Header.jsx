import React from 'react'
import './Header.css'
import logo from '../../assets/pink-ribbon (1).png'

const Header = () => {
  return (
    <header className='header'>
        <img src={logo} alt="" className='logo' />
        <h1 className='logoname'>BreastCare AI</h1>

        <nav className='navbar'>
            <a href='/'>Home</a>
            <a href='/'>About</a>
        </nav>
    </header>
  )
}

export default Header
