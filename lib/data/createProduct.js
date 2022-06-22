import graphcmsMutationClient, { gql } from '../graphcms-mutation-client'

export const createProductMutation = gql`
  mutation createProductMutation($product: ProductCreateInput!) {
    product: createProduct(data: $product) {
      id
    }
  }
`

async function createProduct(product) {
  const { articleNumber, description, quantity, price, catalogueNumber, slug } =
    product

  return await graphcmsMutationClient.request(createProductMutation, {
    product: {
      articleNumber: articleNumber,
      name: description,
      description: description,
      quantity: parseInt(quantity),
      price: parseInt(price),
      catalogueNumber: catalogueNumber,
      slug: slug?.toLowerCase().replace(/[+\/_ ]/g, '-'),
    },
  })
}

export default createProduct
