import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import MobNav from './MobNav'
import HopHelper from '../../pages/api/helpers'
import { useCart } from 'react-use-cart'

const Navbar = () => {
  const { items } = useCart()
  const [mobNav, setMobNav] = useState(false)
  const Toggle = () => setMobNav(!mobNav)
  const [scrollY, setScrollY] = useState(0)

  const router = useRouter()
  const location = router.asPath
  const homeActive = ['/'].includes(location) ? 'active' : ''
  const cartActive = ['/cart'].includes(location) ? 'active' : ''
  const contactActive = ['/contact'].includes(location) ? 'active' : ''

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
          <Link href='/contact'>
            <a className={`navbar__links--a ${contactActive}`}>
              <p>Kontakt</p>
            </a>
          </Link>
        </div>
      </div>
      <div className='navbar__links--link'>
        <Link href='/cart'>
          <a className={`navbar__links--a ${cartActive}`}>
            <Image src='/shopping-cart.svg' height={30} width={30} />
            <div className='navbar__cart'>
              <span className='amount'>
                <p>{HopHelper.totalAmount(items)}</p>
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
