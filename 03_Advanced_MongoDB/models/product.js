import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : String,
    category : String ,
    price : Number,
    inStock : Boolean,
    tags : [String]
});

export const Product = mongoose.model("Product", productSchema);