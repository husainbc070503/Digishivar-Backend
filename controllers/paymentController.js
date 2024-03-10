import { instance } from "../index.js";

const productPrices = async (req, res) => {
  const options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);

  console.log(order);
  res.status(200).json({
    success: true,
  });
};

export default productPrices;
