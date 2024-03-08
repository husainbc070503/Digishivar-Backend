import Wishlist from "../models/Wishlists.js";

const createList = async (req, res) => {
    try {
        const { name } = req.body.name
        if (!name)
            return res.status(400).json({ success: false, message: "Please enter list name" });

        const list = await Wishlist.create({ name, user: req.user._id });
        res.status(200).json({ success: true, list });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const addToList = async (req, res) => {
    try {
        const { id, pid } = req.params;
        const list = await Wishlist.findByIdAndUpdate(id, { $push: { products: pid } }, { new: true })
            .populate('user', '-password')
            .populate('products');

        res.status(200).json({ success: true, list });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const removeFromList = async (req, res) => {
    try {
        const { id, pid } = req.params;
        const list = await Wishlist.findByIdAndUpdate(id, { $pull: { products: pid } }, { new: true })
            .populate('user', '-password')
            .populate('products');

        res.status(200).json({ success: true, list });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const deleteList = async (req, res) => {
    try {
        await Wishlist.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export { createList, addToList, removeFromList, deleteList };