import React from 'react'

import getAllCategories from '../../lib/get-all-categories'
import getCategoryBySlug from '../../lib/get-category-slug'
import getPageData from '../../lib/get-page-data'
import ProductPage from '../../components/ProductPage'

//import SEO from '../../components/seo'

function CategoryPage({ category }) {
  return (
    <>
      <ProductPage products={category.products} />
    </>
  )
}

export async function getStaticPaths({ locales }) {
  let paths = []

  for (const locale of locales) {
    const { categories } = await getAllCategories({ locale })

    paths = [
      ...paths,
      ...categories.map((category) => ({
        params: { slug: category.slug },
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
  const pageData = await getPageData({ locale })
  const { category } = await getCategoryBySlug({
    locale,
    slug: params.slug,
  })

  return {
    props: {
      category,
      ...pageData,
    },
  }
}

export default CategoryPage
