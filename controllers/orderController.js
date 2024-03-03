import Order from "../models/Order";

//Register
const orderControllerPost = async (req, res) => {
  try {
    var order = await Order.create({ ...req.body, user: req.user._id });
    order = await Order.findById(order._id)
      .populate("user")
      .populate("product");

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const orderControllerGet = async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("product");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { orderControllerPost, orderControllerGet };
