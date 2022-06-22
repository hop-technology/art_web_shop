import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MobNav = ({ show, close }) => {
  const [scrollY, setScrollY] = useState(0)
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
  },[])

  // images needs to be changed to webp

  const isScrolled = scrollY >= 10 ? 'scrolled' : ''
  return (
    <>
      {show ? (
        <div className={`mob-nav-bg ${isScrolled}`} onClick={() => close()}>
          <div className='mob-nav' onClick={(e) => e.stopPropagation()}>
            <div className='mob-nav__links'>
              <div className='mob-nav__links--link'>
                <Link href='/' passHref>
                  <a className='mob-nav__links--a' onClick={() => close()}>
                    Home
                  </a>
                </Link>
              </div>
              <div className='mob-nav__links--link'>
                <Link href='/contact' passHref>
                  <a className='mob-nav__links--a' onClick={() => close()}>
                    Contact
                  </a>
                </Link>
              </div>
              <div className='mob-nav__links--link'>
                <Link href='/cart' passHref>
                  <a className='mob-nav__links--a' onClick={() => close()}>
                    Cart
                  </a>
                </Link>
              </div>
              <div className='image-container'>
                <div className='image-container--image'>
                  <Image
                    src='/Walborg_logo_Center_BLACK.png'
                    height={446}
                    width={392}
                    alt='Walborg logo'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default MobNav
