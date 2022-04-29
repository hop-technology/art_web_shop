import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children, footer }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer {...footer} />
    </>
  )
}


export default Layout