import Image from 'next/image'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='content'>
        <div className='content__image'>
          <Image
            src='/Walborg_logo_Center_BLACK.png'
            height={100}
            width={120}
            alt='Walborg logo'
            priority
          />
        </div>
        <div className='content__contact'>
          <div className='content__contact--item'>
            <p>Jens Number</p>
          </div>
          <div className='content__contact--item'>
            <p>shop@walborgventures.com</p>
          </div>
          <div className='content__contact--item'>
            <p>Gothenburg</p>
          </div>
        </div>
      </div>
      <p className='copy-right'>Powered by HOP Technology</p>
    </div>
  )
}

export default Footer
