const Post = require('./models/PostModel')

const resolvers = {
    Query: {
        // hello: ()=> {
        //     return "Hello World"
        // },
        getAllPosts: async ()=>{
            const posts = await Post.find()
            return posts
        },
        getSinglePost: async (parent, args, context, info)=> {
            const {id} = args
            console.log(args)
            return await Post.findById(id)
        }
    },
    Mutation: {
        createPost: async(parent, args, context, info)=> {
            const {title, description} = args.post
            console.log(title, description)
            const post = new Post({title, description})
            await post.save()
            return post
        },
        deletePost: async(parent, args, context, info)=>{
            const {id} = args
            const post = await Post.findByIdAndDelete(id)
            return "Post is deleted"
        },
        updateSinglePost: async(parent, args, context, info)=>{
            const {id} = args
            const {title,description} = args.post
            const post = await Post.findByIdAndUpdate(id, {title, description})
            return post
        },
    }
}

module.exports = resolvers


// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()
