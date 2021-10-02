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

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }
`

const resolvers = {
  Query: {
    posts: async (_, __, {dataSources}) => {
      return dataSources.postsAPI.getPosts();
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
  dataSources: () => {
    return {
      postsAPI: new PostsAPI(),
    };
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})