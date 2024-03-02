import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./database/db_conn.js";
import Prices from "./routes/ProductsPrices.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Hello World"));
app.use('/api/price', Prices);

app.listen(port, () => console.log(`Server running on port ${port}`));