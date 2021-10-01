const { ApolloServer, gql } = require('apollo-server')
const PostsAPI = require('./post-api.js');


const typeDefs = gql`
  type Post {
    id: ID
    title: String
    body: String
    comments(search: String): [Comment] 
    

  }

  type Comment {
    id:ID
    name: String
    email: String
    body: String
    postId: ID
  }

  type Query {
    posts: [Post]
    comments(id: ID): [Comment]
    post(id: ID): Post
    comment(id: ID): Comment
    commentByName(name: String): Comment
  }
`

const resolvers = {
  Query: {
    posts: async (_, __, {dataSources}) => {
      return dataSources.postsAPI.getPosts();
    },
    // comments: async (_, __, {dataSources}) => {
    //   return dataSources.postsAPI.getComments();
    // },
    post: (_, { id }, { dataSources }) => {
      return dataSources.postsAPI.getPostById({ id: id });
    },
    // ,
    // comments: (_, { id }, { dataSources }) => {
    //   return dataSources.postsAPI.getCommentsById({ id: id });
    // },
    // commentByName: (_, { name }, { dataSources }) => {
    //   return dataSources.postsAPI.getCommentsByName({ name: name });
    // }


  },

  Post: {
    comments: (post, {search}, { dataSources }) => {
      return dataSources.postsAPI.getCommentsById({ id: post.id, search: search});
    }
 
  }

  
}



// const resolvers = {
//   Query: {
//     movie: async (_, { id }, { dataSources }) => {
//       return dataSources.moviesAPI.getMovie(id);
//     },
//     mostViewedMovies: async (_, __, { dataSources }) => {
//       return dataSources.moviesAPI.getMostViewedMovies();
//     },
//     favorites: async (_, __, { dataSources }) => {
//       return dataSources.personalizationAPI.getFavorites();
//     },
//   },
// };

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