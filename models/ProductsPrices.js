import mongoose from "mongoose";

const ProductsPricesSchema = new mongoose.Schema({
    vegetable: String,
    farmerPrice: Number,
    wholesalePrice: Number,
    retailPrice: String,
    shoppingMall: String,
    units: String,

}, { timestamps: true });

const ProductsPrices = mongoose.model('product-prices', ProductsPricesSchema);
export default ProductsPrices;