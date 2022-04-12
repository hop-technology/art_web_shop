import Image from 'next/image'
import { addToCart } from '../redux/cart.slice'
import { useDispatch } from 'react-redux'

const ProductPage = ({ product }) => {
  const dispatch = useDispatch()
  return (
    <div className='product-page'>
      <div className='product-page__container'>
        <h1>{product.name}</h1>
        <div className='product-page__text'>
          <p>{product.description}</p>
          <p>{product.price} SEK</p>
        </div>
        <div className='product-page__btn-container'>
          <button
            onClick={() => dispatch(addToCart(product))}
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
  )
}

export default ProductPage
