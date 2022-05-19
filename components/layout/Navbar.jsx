import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import MobNav from './MobNav'
import HopHelper from '../../pages/api/helpers'
import { useCart } from 'react-use-cart'

const Navbar = () => {
  const { items, isEmpty } = useCart()
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
        <div className='navbar__links--left'>
          <div className='selection'>
            <Link href='/' passHref>
              <a className={`navbar__links--a ${homeActive}`}>Hem</a>
            </Link>
          </div>
          <div className='selection'>
            <Link href='/contact'>
              <a className={`navbar__links--a ${contactActive}`}>
                <p>Kontakt</p>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className='navbar__links'>
        <div className='navbar__links--right'>
          <div className='selection'>
            <div className='selection__cart'>
              <Link href='/cart'>
                <a className={`navbar__links--a ${cartActive}`}>
                  <Image
                    src='/shopping-cart.svg'
                    height={30}
                    width={100}
                    className='selection__image'
                    alt='cart icon'
                  />
                  {isEmpty ? (
                    ''
                  ) : (
                    <div className='selection__amount'>
                      <p>{HopHelper.totalAmount(items)}</p>
                    </div>
                  )}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
