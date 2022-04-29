import Head from 'next/head'
import { useRouter } from 'next/router'
import getAllProducts from '../lib/get-all-product'
import ProductCard from '../components/ProductCard'
import PopUp from '../components/PopUp'
import HopHelper from './api/helpers'
import { useEffect } from 'react'
import getPageData from '../lib/get-page-data'

function Index({ products }) {
  const router = useRouter()
  const { status } = router.query

  useEffect(() => {
    HopHelper.popupStatus(status)
  }, [status])

  return (
    <>
      <Head></Head>
      <div>
        <div className='homepage'>
          <PopUp />
          <ProductCard products={products} />
        </div>
      </div>
    </>
  )
}

export default Index

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })
  const { products } = await getAllProducts({ locale })

  return {
    props: {
      ...pageData,
      products,
    },
  }
}
