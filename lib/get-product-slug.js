import graphcmsClient, { gql } from './graphcms-client'
import { ProductFragment } from './graphql-fragments'

export const getProductsSlugQuery = gql`
  query CollectionSlugQuery($locale: Locale!, $slug: String!) {
    products(where: { slug: $slug }, locales: [$locale, en, se]) {
      ...ProductFragment
      localizations(includeCurrent: true) {
        locale
        name
        slug
      }
    }
  }

  ${ProductFragment}
`

async function getProductBySlug({ locale = ['en', 'se'], slug }) {
  const {
    products: [product]
  } = await graphcmsClient.request(getProductsSlugQuery, {
    locale,
    slug
  })

  return { product }
}

export default getProductBySlug
