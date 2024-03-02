import { Router } from "express";
import Blogs from "../models/Blogs.js";
const router = Router();

router.post('/createBlog', async (req, res) => {
    try {
        var blog = await Blogs.create({ ...req.body });
        blog = await Blogs.findById(blog._id).populate('user');
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/updateBlog/:id', async (req, res) => {
    try {
        const blog = await Blogs.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true }).populate('user');
        res.status(200).json({ success: true, blog });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/deleteBlog/:id', async (req, res) => {
    try {
        await Blogs.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blogs.find().populate('user');
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;