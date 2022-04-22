import Head from 'next/head'
import { useRouter } from 'next/router'
import getAllProducts from '../lib/get-all-product'
import ProductCard from '../components/ProductCard'
import PopUp from '../components/PopUp'
import HopHelper from './api/helpers'

const index = ({ products }) => {
  const router = useRouter()
  const { status } = router.query

  let popup = (status) => {
    HopHelper.popupStatus(status)
    return <PopUp />
  }

  return (
    <>
      <Head></Head>
      <div>
        <div className='homepage'>
          {popup(status)}
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
