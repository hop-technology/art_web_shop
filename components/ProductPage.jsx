import Image from 'next/image'

const ProductPage = ({ product }) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.images[0].url} alt={product.name} height={200} width={200} />
      <p>{product.description}</p>
      <p>{product.price}</p>
      <button>
          <p>Add to Cart</p>
      </button>
    </div>
  )
}

export default ProductPage
