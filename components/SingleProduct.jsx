import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'
import Image from 'next/image'
import Button from './ui/Button'
import HopHelper from '../pages/api/helpers'
import { useDispatch } from 'react-redux'
import { errorMessage, successMessage } from '../redux/reducers/message.slice'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

const SingleProduct = ({ props, activeCurrency }) => {
  const { addItem } = useCart()
  const dispatch = useDispatch()
  const router = useRouter()
  const [variantQuantity, setVariantQuantity] = useState(1)
  const [activeVariantId, setActiveVariantId] = useState(
    router.query.variantId || props.variants[0].id
  )
  const [activeVariantName, setActiveVariantName] = useState(
    '-- Select a color --'
  )

  useEffect(() => {
    const url = `/products/${props.slug}?variant=${activeVariantId}`

    router.replace(url, url, { shallow: true })
  }, [activeVariantId])

  const activeVariant = props.variants.find(
    (variant) => variant.id === activeVariantId
  )
  const changeVariant = (event) => setActiveVariantId(event.target.value)

  const updateQuantity = (event) =>
    setVariantQuantity(Number(event.target.value))

  const addToCart = () => {
    const itemMetadata = router.locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale]: {
          ...props.localizations.find(
            (localization) => localization.locale === locale
          ),
        },
      }),
      {}
    )
    let popUpMessage = 'Product added to cart'
    try {
      let product = {
        id: activeVariantId,
        name: props.name,
        size: activeVariant.name,
        productId: props.id,
        image: props.images[0],
        price: props.price,
        ...itemMetadata,
      }

      addItem(product, variantQuantity)
      dispatch(successMessage(popUpMessage))
    } catch (error) {
      dispatch(errorMessage('Something went wrong please try again later'))
    }
  }

  return (
    <div className='product-page'>
      <div className='product-page__content'>
        <h1 className='product-page__content--name'>{props.name}</h1>
        <div className='product-page__content--desc'>
          <p>{props.description}</p>
        </div>
        <div className='product-page__content--price'>
          <p>
            {HopHelper.numberFormatter({
              currency: activeCurrency,
              value: props.price,
            })}
          </p>
        </div>
        <div className='product-page__content--size'>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className='trigger'>
              {activeVariantName}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content loop className='content'>
              {props.variants.map((variant) => (
                <DropdownMenu.Item
                  className='item'
                  key={variant.id}
                  onClick={() => [
                    setActiveVariantId(variant.id),
                    setActiveVariantName(variant.name),
                  ]}>
                  {variant.name}
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Arrow offset={5} className="arrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <select
            className='quantity'
            id='quantity'
            name='quantity'
            value={variantQuantity}
            onChange={updateQuantity}>
            {Array.from({ length: 5 }, (_, i) => {
              const value = Number(i + 1)
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </select>
        </div>

        <Button
          onClick={() => addToCart()}
          className='product-page__content--btn'>
          Add to cart
        </Button>
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

{
  /* <div className='product-page'>
      <div className='product-page__container'>
        <h1>{props.name}</h1>
        <div className='product-page__text'>
          <p>{props.description}</p>
          <div>
            <select value={activeVariantId} onChange={changeVariant}>
              {props.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.name}
                </option>
              ))}
            </select>
            <select
              id='quantity'
              name='quantity'
              value={variantQuantity}
              onChange={updateQuantity}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const value = Number(i + 1)

                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                )
              })}
            </select>
          </div>
          <p>
            {HopHelper.numberFormatter({
              currency: activeCurrency,
              value: props.price,
            })}
          </p>
        </div>
        <div className='product-page__btn-container'>
          <Button onClick={() => addToCart()} className='product-page__btn'>
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
    </div> */
}
