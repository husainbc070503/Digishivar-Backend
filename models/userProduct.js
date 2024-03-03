import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
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
      enum: ["High", "Moderate"],
      required: [true, "Please specify quality"],
    },
    price: {
      type: Number,
      required: [true, "Please add price"],
    },
    img: {
      type: String,
      required: [true, "Please add image"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);
export default Product;
