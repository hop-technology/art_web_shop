import getAllProducts from '../../lib/get-all-product'
import getProductBySlug from '../../lib/get-product-slug'
import NonVariantHandler from '../../components/NonVariantHandler'
import VariantsHandler from '../../components/VariantsHandler'
import Categories from '../../components/Categories'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PopUp from '../../components/PopUp'
import { useSettingsContext } from '../../context/settings'

const Product = ({ product }) => {
  const message = useSelector((state) => state.message)
  const { activeCurrency } = useSettingsContext()
  const router = useRouter()

  return (
    <>
      {message === '' ? null : <PopUp />}

      {router.pathname === '/products/[slug]' ? (
        product.variants.length < 1 ? (
          <NonVariantHandler props={product} activeCurrency={activeCurrency} />
        ) : (
          <VariantsHandler props={product} activeCurrency={activeCurrency} />
        )
      ) : (
        <Categories
          props={product}
          title={router.query.slug}
          activeCurrency={activeCurrency}
        />
      )}
    </>
  )
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
