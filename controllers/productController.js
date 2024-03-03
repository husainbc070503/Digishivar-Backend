import Product from "../models/userProduct.js";

//Add Product
const productController = async (req, res) => {
  try {
    const { vegetable, desc, quantity_type, quantity, quality, price, img } =
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
    if (!img) {
      return res.status(400).send({
        success: false,
        message: "Image is required",
      });
    }

    //Existing Product
    // const existingProduct = await userModel.findOne({ vegetable: vegetable });
    // if (existingUser) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "User already registered with this email",
    //   });
    // }

    //Save Product in database
    const product = await Product({
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


export default productController;