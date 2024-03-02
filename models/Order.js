import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    vegetable: {
      type: String,
      required: [true, "Please add vegetable name"],
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
      required: [true, "Please specify quality"],
    },
    price: {
      type: String,
      required: [true, "Please add price"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },

    address: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: String,
      required: true,
    },

    transportationRequired: {
      type: Boolean,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
