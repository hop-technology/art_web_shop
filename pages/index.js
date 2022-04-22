import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import getAllProducts from '../lib/get-all-product'
import ProductCard from '../components/ProductCard'
import PopUp from '../components/PopUp'
import { successMessage, errorMessage } from '../redux/reducers/message.slice'

const router = useRouter()
const dispatch = useDispatch()

const index = ({ products }) => {
  const { status } = router.query

  const paymentConfirmed = () => {
    dispatch(successMessage('Payment successful'))
  }

  const paymentCancelled = () => {
    dispatch(errorMessage('Payment unsuccessful'))
  }

  return (
    <>
      <Head></Head>
      <div>
        <div className='homepage'>
          <PopUp />
          {status && status === 'success' && paymentConfirmed()}
          {status && status === 'cancel' && paymentCancelled()}
          <ProductCard products={products} />
        </div>
      </div>
    </>
  )
}

export default index

export async function getStaticProps({ locale }) {
  const { products } = await getAllProducts({ locale })

  return {
    props: {
      products,
    },
  }
}
