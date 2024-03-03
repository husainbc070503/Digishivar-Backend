const ProductPrices = require("../models/productPrices");

async (req, res) => {
  try {
    const prices = await ProductPrices.find();
    res.status(200).json({ success: true, prices });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
