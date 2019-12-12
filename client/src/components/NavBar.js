import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <nav>
    <ul>
      <li><NavLink exact to="/">Home</NavLink></li>
      <li><NavLink exact to="/bars">BarsList</NavLink></li>
    </ul>
  </nav>
)

export default NavBar
