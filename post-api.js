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
    const posts = await this.get(`posts/`)
    return(posts)  
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



  // async getPostById({ id }) {
  //   const response = await this.get('posts', { id: id });
  //   return response[0]
  // }

  // async getCommentsById({ id }) {
  //   const response = await this.get('comments', { postId: id });
  //   // return this.commentReducer(response[1]);
  //   return response
  // }


  async getPostById({ id }) {
    const posts = await this.get('posts/');
    const post = posts.find((post => post.id == id))
    return post
  }

  async getCommentsById({ id, search }) {
    const comments = await this.get('comments/');
    const filtered = comments.filter((comment => comment.postId == id ))

    if(!search){
      return filtered
    }
    const searched = filtered.filter((comment) => comment.name.includes(search) || comment.email.includes(search) || comment.body.includes(search) )
    return searched
  }







}

module.exports = PostsAPI;

