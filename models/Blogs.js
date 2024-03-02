import mongoose from "mongoose";

const BlogsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Blogs = mongoose.model('blog', BlogsSchema);
export default Blogs;