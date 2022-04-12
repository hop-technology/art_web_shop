import Head from 'next/head'


import getAllProducts from '../lib/get-all-product'
import ProductCard from '../components/ProductCard'

const index = ({ products }) => {
  return (
    <>
      <Head></Head>
      <div>
        <div className='homepage'>
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
