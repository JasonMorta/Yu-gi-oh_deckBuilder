import { Link } from "react-router-dom";
import React from 'react'
import CSS from './nav.module.css'

export default function Navigation() {
  return (
    <div className={CSS.nav_bar}>
        <Link to="/">Home</Link>
 
        <Link to="/deck">Deck</Link>
        <Link to="/favs">Favs</Link>
        <Link to="/about">About</Link>
    </div>
  )
}
