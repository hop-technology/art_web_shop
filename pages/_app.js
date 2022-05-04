import { Provider } from 'react-redux'
import { SettingsProvider } from '../context/settings'
import store from '../redux/store/store'
import '../styles/style.css'
import Layout from '../components/layout/Layout'

const MyApp = ({ Component, pageProps }) => {
  return (
    <SettingsProvider>
      <Provider store={store}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SettingsProvider>
  )
}

export default MyApp
