import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./database/db_conn.js";
import Prices from "./routes/ProductsPrices.js";
import ErrorHandler from "./handlers/ErrorHandler.js";
import Authenticate from "./routes/userRoutes.js";
import Product from "./routes/Products.js";
import Order from "./routes/Order.js";
import Blog from "./routes/Blogs.js";
import Wishlist from "./routes/Wishlist.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Hello World"));

app.use('/api/user', Authenticate);
app.use('/api/product', Product);
app.use('/api/order', Order);
app.use('/api/blog', Blog);
app.use('/api/price', Prices);
app.use('/api/wishlist', Wishlist);

app.use(ErrorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));