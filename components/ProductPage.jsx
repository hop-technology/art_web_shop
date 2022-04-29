import Image from 'next/image'
import { useRouter } from 'next/router'
import { addToCart } from '../redux/reducers/cart.slice'
import { successMessage } from '../redux/reducers/message.slice'
import { useDispatch, useSelector } from 'react-redux'
import PopUp from './PopUp'
import HopHelper from '../pages/api/helpers'

function ProductPage({ product }) {
  const message = useSelector((state) => state.message)
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
        <div className='product-page'>
          <div className='product-page__container'>
            <h1>{data.name}</h1>
            <div className='product-page__text'>
              <p>{data.description}</p>
              <p>{HopHelper.numberFormatter(data.price)}</p>
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
              src={data.images[0].url}
              alt={data.name}
              height={600}
              width={600}
            />
          </div>
        </div>
      )
    } else {
      return data.map((item, index) => {
        return (
          <div className='product-page' key={index}>
            <div className='product-page__container'>
              <h1>{item.name}</h1>
              <div className='product-page__text'>
                <p>{HopHelper.numberFormatter(item.price)}</p>
              </div>
            </div>
            <div className='product-page__image'>
              <Image
                src={item.images[0].url}
                alt={item.name}
                height={600}
                width={600}
              />
            </div>
          </div>
        )
      })
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
