import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import MobNav from './MobNav'

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const [mobNav, setMobNav] = useState(false)
  const Toggle = () => setMobNav(!mobNav)
  const [scrollY, setScrollY] = useState(0)

  const router = useRouter()
  const location = router.asPath
  const homeActive = ['/'].includes(location) ? 'active' : ''
  const cartActive = ['/cart'].includes(location) ? 'active' : ''

  const logit = () => {
    setScrollY(window.pageYOffset)
  }

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', logit)
    }
    watchScroll()
    return () => {
      window.removeEventListener('scroll', logit)
    }
  })

  const isScrolled = scrollY >= 10 ? 'scrolled' : ''

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className={`navbar ${isScrolled}`}>
      <button className='navbar__burger' onClick={() => Toggle()}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <MobNav show={mobNav} close={Toggle} />

      <div className='navbar__links'>
        <div className='navbar__links--link'>
          <Link href='/' passHref>
            <a className={`navbar__links--a ${homeActive}`}>Hem</a>
          </Link>
        </div>
        <div className='navbar__links--link'>
          <Link href='/cart'>
            <a className={`navbar__links--a ${cartActive}`}>
              Cart ({getTotalItems()})
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
