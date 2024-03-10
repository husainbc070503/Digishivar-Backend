import { instance } from "../index.js";
import crypto from "crypto";

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);

  console.log(order);
  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", razorpay_signature);
  console.log("sig generated ", expectedSignature);

  res.status(200).json({
    success: true,
  });
};

export { checkout, paymentVerification };
