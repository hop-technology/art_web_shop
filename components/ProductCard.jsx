import Image from 'next/image'
import Link from 'next/link'

function ProductCard({ products }) {
  return products.map((product, slug) => {
    return (
      <Link href={`/products/${product.slug}`} key={slug}>
        <div className='product-card'>
          <h2>{product.name}</h2>
          <Image src={product.images[0].url} width={200} height={200} />
        </div>
      </Link>
    )
  })
}

export default ProductCard
