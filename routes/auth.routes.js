import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;
