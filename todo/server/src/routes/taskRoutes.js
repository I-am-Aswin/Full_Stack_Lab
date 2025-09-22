import express from "express";
import protect from "#app/middlewares/authMiddleware.js";

import { 
    getTasks,
    createTask, 
    getTask, 
    updateTask, 
    deleteTask, 
    markComplete 
} from "#app/controllers/taskController.js"

const router = express.Router();

router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/complete", markComplete);

export default router;
