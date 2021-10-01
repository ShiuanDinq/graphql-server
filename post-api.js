const { RESTDataSource } = require('apollo-datasource-rest');

class PostsAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getPosts() {
    // Send a GET request to the specified endpoint
    return this.get(`posts/`);
    
  }

  // async getComments() {
  //   // Send a GET request to the specified endpoint
  //   return this.get(`comments/`);
  // }

  // postReducer(post) {
  //   return {
  //     id: post.id || 0,
  //     title: post.title || "",
  //     body: post.body || "",
  //     comments: {
  //       id: post.comment.id || 0,
  //       name: post.comment.name || "",
  //       body: post.comment.body || "",
  //       email: post.comment.email || "",
  //     }

  //   };
  // }

  // commentReducer(comment) {
  //   return {
  //     id: comment.id || 0,
  //     name: comment.name || "",
  //     body: comment.body || "",
  //     postId: comment.postId || "",

  //   };
  // }



  async getPostById({ id }) {
    const response = await this.get('posts', { id: id });
    return response[0]
  }

  async getCommentsById({ id }) {
    const response = await this.get('comments', { postId: id });
    // return this.commentReducer(response[1]);
    return response
  }



}

module.exports = PostsAPI;

