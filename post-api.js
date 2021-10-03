const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server-errors')

class PostsAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getPosts(args) {
    const list = await this.get(`posts/`)
    // initialise first
     let first = 5;
     if (args.first !== undefined) {
       const min_value = 1;
       const max_value = 25;
       if (args.first < min_value || args.first > max_value) {
         throw new UserInputError(
           `Invalid limit value (min value: ${min_value}, max: ${max_value})`
         );

       }
       first = args.first;
     }
     // initialise cursor
     let after = 0;
     if (args.after !== undefined) {
       const index = list.findIndex((item) => item.id == args.after);
       if (index === -1) {
         throw new UserInputError(`Invalid after value: cursor not found.`);
       }
       after = index + 1;
       if (after === list.length) {
         throw new UserInputError(
           `Invalid after value: no items after provided cursor.`
         );
       }
     }
   
     const posts = list.slice(after, after + first);
     const lastPost = posts[posts.length - 1];
   
     return {
       pageInfo: {
         endCursor: lastPost.id,
         hasNextPage: after + first < list.length,
       },
       edges: posts.map((post) => ({
         cursor: post.id,
         node: post,
       })),
     };
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

