const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin")
            return res.status(400).json({ success: false, message: 'Invalid user' })

        return next();

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export default isAdmin;