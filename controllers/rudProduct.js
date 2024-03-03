import Product from "../models/userProduct.js";

const editProduct = async (req, res) => {
  try {
    var product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("user", "-password");

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    var products = await Product.find().populate("user", "-password");

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { editProduct, deleteProduct, getProduct };
