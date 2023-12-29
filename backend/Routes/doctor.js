import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
  getMyPatientsAppointments,
  updateAvailability,
  getAvailability,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

// nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
// Update availability
router.put("/:doctorId/availability", updateAvailability);
// Get availability
router.get("/:doctorId/availability", getAvailability);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["doctor"]),
  getMyPatientsAppointments
);

export default router;
