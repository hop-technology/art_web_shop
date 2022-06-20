import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useCart } from 'react-use-cart';
import Image from 'next/image';
import Button from './ui/Button';
import HopHelper from '../pages/api/helpers';
import { useDispatch } from 'react-redux';
import { errorMessage, successMessage } from '../redux/reducers/message.slice';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const VariantsHandler = ({ props, activeCurrency }) => {
  const { addItem } = useCart();
  const dispatch = useDispatch();
  const router = useRouter();
  const [variantQuantity, setVariantQuantity] = useState(1);
  const inputRef = useRef(1);
  const [activeVariantId, setActiveVariantId] = useState(
    router.query.variantId || props.variants[0].id
  );

  useEffect(() => {
    const url = `/products/${props.slug}?variant=${activeVariantId}`;
    router.replace(url, url, { shallow: true });
  }, [activeVariantId, props.slug, router, props.variants.length]);

  const activeVariant =
    props.variants.length < 1
      ? setActiveVariantId('')
      : props.variants.find((variant) => variant.id === activeVariantId);
  const changeVariant = (event) => setActiveVariantId(event.target.value);

  const updateQuantity = (event) =>
    setVariantQuantity(Number(event.target.value));

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
    );
    let popUpMessage = 'Product added to cart';
    let id = activeVariantId ? activeVariantId : props.id;
    let image = props.images[0]?.url || '/Walborg_logo.png';
    try {
      let product = {
        id: id,
        name: props.name,
        size: activeVariant.name,
        productId: props.id,
        image: image,
        price: props.price,
        ...itemMetadata,
      };

      addItem(product, variantQuantity);
      dispatch(successMessage(popUpMessage));
    } catch (error) {
      dispatch(errorMessage('Something went wrong please try again later'));
    }
  };

  const decrement = () => {
    if (inputRef.current > 1) {
      inputRef.current--;
      setVariantQuantity(inputRef.current);
    }
  };

  const increment = () => {
    if (inputRef.current <= 49) {
      inputRef.current++;
      setVariantQuantity(inputRef.current);
    }
  };

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
        <div className='product-page__content--options'>
          <div className='size'>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className='trigger'>
                {activeVariant.name}
                <svg
                  className='caret-down'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z'
                    fill='currentColor'
                    fillRule='evenodd'
                    clipRule='evenodd'></path>
                </svg>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content loop className='content'>
                {props.variants.map((variant) => (
                  <DropdownMenu.Item
                    className='item'
                    key={variant.id}
                    onClick={() => setActiveVariantId(variant.id)}>
                    {variant.name}
                  </DropdownMenu.Item>
                ))}
                <DropdownMenu.Arrow offset={5} className='arrow' />
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          <div className='quantity'>
            <label htmlFor='quantity'>Pcs:</label>
            <button onClick={decrement} className='quantity-minus'>
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'></path>
              </svg>
            </button>
            <input
              className='quantity__input'
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              max='50'
              readOnly
              onChange={updateQuantity}
              value={variantQuantity}></input>
            <button onClick={increment} className='quantity-plus'>
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z'
                  fill='currentColor'
                  fillRule='evenodd'
                  clipRule='evenodd'></path>
              </svg>
            </button>
          </div>
        </div>

        <Button
          onClick={() => addToCart()}
          className='product-page__content--btn'>
          Add to cart
        </Button>
      </div>
      <div className='product-page__image'>
        <Image
          src={
            props.images.length < 1
              ? '/Walborg_logo.png'
              : props.images?.[0]?.url
          }
          alt={props.name}
          height={600}
          width={600}
        />
      </div>
    </div>
  );
};

export default VariantsHandler;
