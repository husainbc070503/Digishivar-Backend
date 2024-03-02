const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
      type: String,
      required: [true, "Please select quantity"],
    },
    quality: {
      type: String,
      enum: ["High", "Moderate"],
      required: [true, "Please specify quality"],
    },
    price: {
      type: String,
      required: [true, "Please add price"],
    },
    img: {
      type: String,
      required: [true, "Please add image"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
