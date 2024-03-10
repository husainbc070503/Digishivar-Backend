import Product from "../models/userProduct.js";

const productController = async (req, res) => {
  try {
    const {
      vegetable,
      desc,
      quantity_type,
      quantity,
      quality,
      price,
      img,
      category,
    } = req.body;

    //Validation
    if (!vegetable) {
      return res.status(400).json({
        success: false,
        message: "Vegetable Name is required",
      });
    }
    if (!quantity_type) {
      return res.status(400).json({
        success: false,
        message: "Quantity type is required",
      });
    }
    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }
    if (!quality) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }
    if (!price) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }
    if (!img) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    //Save Product in database
    const product = await Product({
      user: req.user._id,
      vegetable,
      desc,
      quantity_type,
      quantity,
      quality,
      price,
      img,
      category,
    }).save();

    //Success
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: true, message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    var product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("user", "-password");

    product = await Product.populate(product, {
      path: "reviews",
      populate: {
        path: "user",
        select: "-password",
      },
    });

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

const getProducts = async (req, res) => {
  try {
    var products = await Product.find().populate("user", "-password");

    products = await Product.populate(products, {
      path: "reviews",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const giveRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const pro = await Product.findById(req.params.id);
    const prevRating = pro.rating;

    const currRating = ((rating + prevRating) / 2).toFixed(1);
    var product = await Product.findByIdAndUpdate(
      req.params.id,
      { rating: currRating },
      { new: true }
    ).populate("user", "-password");

    product = await Product.populate(product, {
      path: "reviews",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addReview = async (req, res) => {
  try {
    var product = await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: { review: req.body.review, user: req.user._id } } },
      { new: true }
    ).populate("user", "-password");

    product = await Product.populate(product, {
      path: "reviews",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    var product = await Product.findByIdAndUpdate(
      req.params.id,
      { $pull: { reviews: { _id: req.params.rid, user: req.user._id } } },
      { new: true }
    ).populate("user", "-password");

    product = await Product.populate(product, {
      path: "reviews",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  productController,
  editProduct,
  deleteProduct,
  getProducts,
  giveRating,
  addReview,
  deleteReview,
};
