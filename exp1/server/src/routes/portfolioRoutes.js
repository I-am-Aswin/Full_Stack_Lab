import express from "express";
import { getPortfolio, savePortfolio } from "#app/controllers/portfolioController.js";
import { protect } from "#app/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPortfolio);
router.post("/", protect, savePortfolio);

export default router;
