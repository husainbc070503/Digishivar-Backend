import { Router } from "express";
import ProductsPrices from "../models/ProductsPrices.js";
const router = Router();

router.get('/prices', async (req, res) => {
    try {
        const prices = await ProductsPrices.find();
        res.status(200).json({ success: true, prices });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;