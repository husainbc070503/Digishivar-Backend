import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]

}, { timestamps: true });

const Wishlist = mongoose.model('wishlist', WishlistSchema);
export default Wishlist;