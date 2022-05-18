import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ products }) => {
  return products.map((product, slug) => {
    return (
      <Link href={`/products/${product.slug}`} key={slug} passHref>
        <div className='product-card'>
          <div className='product-card__image'>
            <Image
              src={product.images[0].url}
              width={300}
              height={300}
              alt={product.name}
            />
          </div>
          <div className='product-card__info'>
            <p className='product-card__info--name'>{product.name}</p>
            <p className='product-card__info--price'>{product.price} kr</p>
          </div>
        </div>
      </Link>
    )
  })
}

export default ProductCard
