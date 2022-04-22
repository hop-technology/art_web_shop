import { gql, GraphQLClient } from 'graphql-request'

export default new GraphQLClient(
  process.env.GRAPH_CMS_CONTENT_API,
  {
    headers: {
      ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
      }),
    },
  }
)

export { gql }
