


const createContentEntry = async (variables) => {
  const client = new GraphQLClient(
    'https://api-eu-central-1.graphcms.com/v2/cl1uicit7b2dz01xj06675vpy/master',
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_MUTATION_GRAPHCMS_TOKEN}`,
      },
    }
  )

  const query = gql`
    mutation createTestProduct(
      $articleNumber: String
      $description: String
      $quantity: Int
      $price: Float
      $catalogueNumber: String
    ) {
      createTestProduct(
        data: {
          articleNumber: $articleNumber
          description: $description
          quantity: $quantity
          price: $price
          catalogueNumber: $catalogueNumber
        }
      ) {
        id
      }
    }
  `

  return client.request(query, variables)
}
