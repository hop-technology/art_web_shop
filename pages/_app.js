import { Provider } from 'react-redux'
import store from '../redux/store'
import Link from 'next/link'
import '../styles/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Link href='/cart'>
        <button className='product-page__btn'>Cart</button>
      </Link>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
