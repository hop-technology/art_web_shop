import Image from 'next/image'
import { addToCart } from '../redux/reducers/cart.slice'
import { successMessage } from '../redux/reducers/message.slice'
import { useDispatch, useSelector } from 'react-redux'
import PopUp from './PopUp'

const ProductPage = ({ product }) => {
  const cart = useSelector((state) => state.cart)
  const message = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    let popUpMessage = 'Product added to cart'
    dispatch(addToCart(product))
    dispatch(successMessage(popUpMessage))
  }

  return (
    <>
      {message === '' ? null : <PopUp />}
      <div className='product-page'>
        <div className='product-page__container'>
          <h1>{product.name}</h1>
          <div className='product-page__text'>
            <p>{product.description}</p>
            <p>{product.price} SEK</p>
          </div>
          <div className='product-page__btn-container'>
            <button
              onClick={() => handleAddToCart()}
              className='product-page__btn'
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className='product-page__image'>
          <Image
            src={product.images[0].url}
            alt={product.name}
            height={600}
            width={600}
          />
        </div>
      </div>
    </>
  )
}

export default ProductPage
