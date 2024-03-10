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
    var blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
      .populate('likes')
      .populate("user", "-password");

    blog = await Blogs.populate(blog, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

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
    var blogs = await Blogs.find()
      .populate('likes')
      .populate("user", "-password");

    blogs = await Blogs.populate(blogs, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const likeBlog = async (req, res) => {
  try {
    var blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { $push: { likes: req.user._id } },
      { new: true }
    )
      .populate("likes")
      .populate("user", "-password");

    blog = await Blogs.populate(blog, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const unlikeBlog = async (req, res) => {
  try {
    var blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .populate("likes")
      .populate("user", "-password");

    blog = await Blogs.populate(blog, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    var blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { comment: req.body.comment, user: req.user._id } },
      },
      { new: true }
    )
      .populate("likes")
      .populate("user", "-password");

    blog = await Blogs.populate(blog, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    var blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { comments: { _id: req.params.cid, user: req.user._id } },
      },
      { new: true }
    )
      .populate("likes")
      .populate("user", "-password");

    blog = await Blogs.populate(blog, {
      path: "comments",
      populate: {
        path: "user",
        select: "-password",
      },
    });

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  likeBlog,
  unlikeBlog,
  addComment,
  deleteComment,
};
