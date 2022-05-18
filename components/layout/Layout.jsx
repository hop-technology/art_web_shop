import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children, footer }) => {
  return (
    <>
      <Navbar />
      <div className='content-container'>{children}</div>
      <Footer {...footer} />
    </>
  )
}

export default Layout
