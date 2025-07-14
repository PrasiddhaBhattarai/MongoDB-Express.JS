// understanding the aggregation (execution pipeline and common aggregation operators)
// document references and populating referenced documents

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import productRoutes from './routes/product-routes.js'
import bookRoutes from './routes/book-routes.js'

const app = express();
const port = process.env.PORT;

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully.");
} catch (error) {
    console.error("Database connection failed!", error);
    process.exit(1);
}

//middlewares
app.use(express.json());

//routes
// mongodb aggregate used here
app.use("/products", productRoutes);
// mongodb reference used here
app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log(`Server listening on port, ${port}`);
});