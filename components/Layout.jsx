import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout = ({ children, footer }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer {...footer} />
    </>
  )
}

export default Layout
