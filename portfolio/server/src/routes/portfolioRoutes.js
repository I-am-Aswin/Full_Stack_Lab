import express from "express";
import { getPortfolio, savePortfolio, updatePortfolio, getPublicPortfolio, generateShareId } from "#app/controllers/portfolioController.js";
import { protect } from "#app/middlewares/authMiddleware.js";

const router = express.Router();

// Protected routes (require authentication)
router.get("/", protect, getPortfolio);
router.post("/", protect, savePortfolio);
router.put("/", protect, updatePortfolio);
router.post("/generate-share-id", protect, generateShareId);

// Public route (no authentication required)
router.get("/public/:shareId", getPublicPortfolio);

export default router;
