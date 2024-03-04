import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    vegetable: {
      type: String,
      required: [true, "Please add vegetable name"],
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    quantity_type: {
      type: String,
      enum: ["quintal", "kg"],
      default: "kg",
      required: [true, "Please select quantity type"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter quantity"],
    },
    quality: {
      type: String,
      enum: ["high", "moderate"],
      required: [true, "Please specify quality"],
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    category: {
      type: String,
      enum: ["leafy vegetable", "rooted vegetable", "herbs"],
      default: 'rooted vegetable'
    },
    img: {
      type: String,
      required: [true, "Please add image"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    rating: {
      type: Number
    },
    reviews: [{
      review: {
        type: String,
        required: true
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }]
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
export default Product;
