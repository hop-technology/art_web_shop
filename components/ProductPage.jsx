import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { addToCart } from '../redux/reducers/cart.slice'
import { successMessage } from '../redux/reducers/message.slice'
import PopUp from './PopUp'
import { useSettingsContext } from '../context/settings'
import Categories from './Categories'
import SingleProduct from './SingleProduct'

const ProductPage = ({ product }) => {
  const message = useSelector((state) => state.message)
  const { activeCurrency } = useSettingsContext()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleAddToCart = () => {
    let popUpMessage = 'Product added to cart'
    dispatch(addToCart(product))
    dispatch(successMessage(popUpMessage))
  }

  let productData = (data) => {
    if (router.pathname === '/products/[slug]') {
      return (
        <SingleProduct
          props={data}
          activeCurrency={activeCurrency}
          addToCart={() => handleAddToCart()}
        />
      )
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
