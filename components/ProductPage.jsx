import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PopUp from './PopUp'
import { useSettingsContext } from '../context/settings'
import Categories from './Categories'
import SingleProduct from './SingleProduct'

const ProductPage = ({ product }) => {
  const message = useSelector((state) => state.message)
  const { activeCurrency } = useSettingsContext()
  const router = useRouter()

  let productData = (data) => {
    if (router.pathname === '/products/[slug]') {
      return <SingleProduct props={data} activeCurrency={activeCurrency} />
    } else {
      return (
        <Categories
          props={data}
          title={router.query.slug}
          activeCurrency={activeCurrency}
        />
      )
    }
  }

  return (
    <>
      {message === '' ? null : <PopUp />}
      {productData(product)}
    </>
  )
}

export default ProductPage
