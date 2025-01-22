import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.post('/register', [
  body('email').isEmail().withMessage("Invalid Email"),
  body('email').isLength({ min: 5 }).withMessage('Email must be atleast 5 characters long'),
  body('firstname').isLength({ min: 3 }).withMessage('Firstname must be atleast 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long'),
], registerUser);

export default router;