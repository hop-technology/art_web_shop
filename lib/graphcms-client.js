import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/cl1uicit7b2dz01xj06675vpy/master',
  {
    headers: {
      ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      }),
    },
  }
)

export { gql }
