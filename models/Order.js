import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    products: [
      {
        pro: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        userQuantityType: {
          type: String,
          enum: ["quintal", "kg"],
          default: "kg",
          required: [true, "Please select quantity type"],
        },
        userQuantity: {
          type: String,
          required: [true, "Please select quantity"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Please add price"],
    },
    transportationRequired: {
      type: String,
      enum: ["pick up", "delivery"],
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    paymentStatus: Boolean,
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
