import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
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
