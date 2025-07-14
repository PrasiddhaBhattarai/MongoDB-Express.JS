import express from "express";
import {insertSampleProducts, getProductStats,  getProductAnalysis } from "../controllers/product-controller.js";

const router = express.Router();

router.post("/add", insertSampleProducts);

router.get("/stats", getProductStats);

router.get("/analysis", getProductAnalysis);

export default router;