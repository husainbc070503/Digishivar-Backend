import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    product: [{
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
      }
    }],
    totalPrice: {
      type: String,
      required: [true, "Please add price"],
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
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
