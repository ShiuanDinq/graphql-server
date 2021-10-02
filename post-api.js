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



  async getPostById({ id }) {
    const posts = await this.get('posts/');
    const post = posts.find((post => post.id == id))
    return post
  }

  async getCommentsById({ id, name, body, email }) {
    const comments = await this.get('comments/');
    const filtered = comments.filter((comment => comment.postId == id ))

    if(name && body && email){
      const searched = filtered.filter((comment) => comment.name.includes(name) && comment.email.includes(email) && comment.body.includes(body) )
      return searched
    }

    if(name && body ){
      const searched = filtered.filter((comment) => comment.name.includes(name) && comment.body.includes(body))
      return searched
    }

    if(name && email ){
      const searched = filtered.filter((comment) => comment.name.includes(name) && comment.email.includes(email))
      return searched
    }

    if(body && email ){
      const searched = filtered.filter((comment) => comment.body.includes(body) && comment.email.includes(email))
      return searched
    }

    if(name){
      const searched = filtered.filter((comment) => comment.name.includes(name))
      return searched
    }

    if(body){
      const searched = filtered.filter((comment) => comment.body.includes(body))
      return searched
    }

    if(email){
      const searched = filtered.filter((comment) => comment.email.includes(email))
      return searched
    }
    
    return filtered
  }







}

module.exports = PostsAPI;

