const { ApolloServer, gql } = require('apollo-server')
const PostsAPI = require('./post-api.js');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    body: String
    comments(name: String, body: String, email: String): [Comment!] 
  }

  type Comment {
    id:ID
    name: String
    email: String
    body: String
    postId: ID
  }

  type Edge {
    cursor: String
    node: Post
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
  type Response {
    edges: [Edge]
    pageInfo: PageInfo
  }


  type Query {
    posts(first: Int, after: String): Response
    post(id: ID!): Post
  }

  schema {
    query: Query
  }
`

const resolvers = {
  Query: {
    posts: async (_, {first, after}, {dataSources}) => {
      return dataSources.postsAPI.getPosts({first: first, after: after});
    },

    post: (_, { id }, { dataSources }) => {
      return dataSources.postsAPI.getPostById({ id: id });
    },

  },

  Post: {
    comments: (post, {name, body, email}, { dataSources }) => {
      return dataSources.postsAPI.getCommentsById({ id: post.id, name: name, body: body, email: email});
    }
 
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => {
    return {
      postsAPI: new PostsAPI(),
    };
  },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
    📭  Query at https://studio.apollographql.com/dev
  `);
});