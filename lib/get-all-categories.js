import graphcmsClient, { gql } from './graphcms-client'
import { CategoryFragment } from './graphql-fragments'

export const getAllCategoriesQuery = gql`
  query getAllCategories($locale: Locale!) {
    categories(locales: [$locale, en]) {
      ...CategoryFragment
    }
  }
  ${CategoryFragment}
`

async function getAllCategories({ locale = 'en' } = {}) {
  const { categories } = await graphcmsClient.request(getAllCategoriesQuery, {
    locale: { locale },
  })
  return categories
}

export default getAllCategories
