import express from "express";
import { createAppointment } from "../Controllers/bookingController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Route to create a new appointment
router.post("/create", authenticate, restrict(["patient"]), createAppointment);

export default router;
