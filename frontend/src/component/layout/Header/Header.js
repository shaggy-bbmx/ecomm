import React from 'react'
import './Header.css'
import { useState } from 'react'
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons.js"
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import HomeOutline from '@mui/icons-material/HomeRounded'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'



const Header = () => {

  const [click, setClick] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  const [yDistance, setYDistance] = useState(0)

  useEffect(() => {
    // const handleScroll = () => {
    //     if (window.scrollY > 50) {
    //         setScrolling(true)
    //     } else {
    //         setScrolling(false)
    //     }
    // }

    const handleScroll = () => {
      if (window.scrollY > yDistance || 0) setScrolling(true)
      else if (window.scrollY < yDistance) setScrolling(false)
      setYDistance(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [yDistance])


  const handleClick = () => setClick(!click)



  return (
    <div>
      <nav className="navbar" style={scrolling ? { display: 'none' } : {}}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>FYNTRA</span>
            <i className="fas fa-code"></i>
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>

          <ul className={!click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links home-icon"
                onClick={handleClick}
              >
                <HomeOutline fontSize='large' />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <LockOpenIcon fontSize='large' />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/search"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <SearchIcon fontSize='large' />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/account"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <AccountCircleIcon fontSize='large' />
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
