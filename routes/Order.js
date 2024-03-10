import { Router } from "express";
import Order from "../models/Order.js";
const router = Router();

router.post('/placeOrder', async (req, res) => {
    try {
        var order = await Order.create({ ...req.body, user: req.user });
        order = await Order.findById(order._id)
            .populate('user')
            .populate('product.pro')

        res.status(200).json({ success: true, order });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('product.pro');

        res.status(200).json({ success: true, orders });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;