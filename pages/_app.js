import { Provider } from 'react-redux'
import { CartProvider } from 'react-use-cart'
import { SettingsProvider } from '../context/settings'
import store from '../redux/store/store'
import '../styles/style.css'
import Layout from '../components/layout/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <SettingsProvider>
      <CartProvider>
        <Provider store={store}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CartProvider>
    </SettingsProvider>
  )
}

export default MyApp
