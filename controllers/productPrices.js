import ProductsPrices from "../models/ProductsPrices.js";

const productPrices = async (req, res) => {
  try {
    const prices = await ProductsPrices.find();
    res.status(200).json({ success: true, prices });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default productPrices;
