import Blogs from "../models/Blogs.js";

const createBlog = async (req, res) => {
  try {
    var blog = await Blogs.create({ ...req.body, user: req.user._id });
    blog = await Blogs.findById(blog._id).populate("user", "-password");
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate("user");
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blogs = await Blogs.find().populate("user");
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { createBlog, updateBlog, deleteBlog, getBlog };
