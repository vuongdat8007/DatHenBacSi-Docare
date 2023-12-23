import express from "express";
import { getAllReview, createReview } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router({ mergeParams: true });

// /doctor/doctorId/reviews

router
  .route("/")
  .get(getAllReview)
  .post(authenticate, restrict(["patient"]), createReview);

export default router;
