import Product from "../models/userProduct.js";

const productController = async (req, res) => {
  try {
    const { vegetable, desc, quantity_type, quantity, quality, price, img, category } =
      req.body;

    //Validation
    if (!vegetable) {
      return res.status(400).send({
        success: false,
        message: "Vegetable Name is required",
      });
    }
    if (!quantity_type) {
      return res.status(400).send({
        success: false,
        message: "Quantity type is required",
      });
    }
    if (!quantity) {
      return res.status(400).send({
        success: false,
        message: "Quantity is required",
      });
    }
    if (!quality) {
      return res.status(400).send({
        success: false,
        message: "Quantity is required",
      });
    }
    if (!price) {
      return res.status(400).send({
        success: false,
        message: "Price is required",
      });
    }
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "Category is required",
      });
    }
    if (!img) {
      return res.status(400).send({
        success: false,
        message: "Image is required",
      });
    }

    //Save Product in database
    const product = await Product({
      user: req.user._id,
      vegetable,
      desc,
      quantity,
      quality,
      price,
      img,
    }).save();

    //Success
    res.status(201).send({
      success: true,
      message: "Product added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in product adding API",
      error,
    });
  }
};

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

export { productController, editProduct, deleteProduct, getProduct };
