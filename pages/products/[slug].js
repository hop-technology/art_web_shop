import getAllProducts from '../../lib/get-all-product'
import getProductBySlug from '../../lib/get-product-slug'
import ProductPage from '../../components/ProductPage'

const Product = ({ product }) => {
  return <ProductPage product={product} />
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { products } = await getAllProducts({ locale })

    paths = [
      ...paths,
      ...products.map((product) => ({
        params: { slug: product.slug },
        locale,
      })),
    ]
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ locale, params }) {
  const { product } = await getProductBySlug({ slug: params.slug, locale })

  return {
    props: {
      product,
    },
  }
}

export default Product
