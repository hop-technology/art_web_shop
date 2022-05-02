import Image from 'next/image'
import { useRouter } from 'next/router'
import { addToCart } from '../redux/reducers/cart.slice'
import { successMessage } from '../redux/reducers/message.slice'
import { useDispatch, useSelector } from 'react-redux'
import PopUp from './PopUp'
import HopHelper from '../pages/api/helpers'
import { useSettingsContext } from '../context/settings'

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
        <div className='product-page'>
          <div className='product-page__container'>
            <h1>{data.name}</h1>
            <div className='product-page__text'>
              <p>{data.description}</p>
              <p>
                {HopHelper.numberFormatter({
                  currency: activeCurrency,
                  value: data.price,
                })}
              </p>
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
      return (
        <div className='categories'>
          <div className='categories__title'>
            <h1>{router.query.slug}</h1>
          </div>
          <div className='categories__grid'>
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <div>
                    <h1>{item.name}</h1>
                    <div>
                      <p>{HopHelper.numberFormatter(item.price)}</p>
                    </div>
                  </div>
                  <div>
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      height={200}
                      width={200}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
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
