import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/style.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp
