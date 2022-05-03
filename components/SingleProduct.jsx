import Image from 'next/image'
import Button from './Button'
import HopHelper from '../pages/api/helpers'

const SingleProduct = ({ props, activeCurrency, addToCart }) => {
  return (
    <div className='product-page'>
      <div className='product-page__container'>
        <h1>{props.name}</h1>
        <div className='product-page__text'>
          <p>{props.description}</p>
          <p>
            {HopHelper.numberFormatter({
              currency: activeCurrency,
              value: props.price,
            })}
          </p>
        </div>
        <div className='product-page__btn-container'>
          <Button onClick={addToCart} className='product-page__btn'>
            Add to cart
          </Button>
        </div>
      </div>
      <div className='product-page__image'>
        <Image
          src={props.images[0].url}
          alt={props.name}
          height={600}
          width={600}
        />
      </div>
    </div>
  )
}

export default SingleProduct
