import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllReviews,
  createReview,
  deleteReview
} from '../Controllers/adminController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.get('/users', authenticateToken, isAdmin, getAllUsers);
router.post('/users', authenticateToken, isAdmin, createUser);
router.put('/users/:id', authenticateToken, isAdmin, updateUser);
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);

// Doctor routes
router.get('/doctors', authenticateToken, isAdmin, getAllDoctors);
router.post('/doctors', authenticateToken, isAdmin, createDoctor);
router.put('/doctors/:id', authenticateToken, isAdmin, updateDoctor);
router.delete('/doctors/:id', authenticateToken, isAdmin, deleteDoctor);

// Appointment routes
router.get('/appointments', authenticateToken, isAdmin, getAllAppointments);
router.post('/appointments', authenticateToken, isAdmin, createAppointment);
router.put('/appointments/:id', authenticateToken, isAdmin, updateAppointment);
router.delete('/appointments/:id', authenticateToken, isAdmin, deleteAppointment);

// Review routes
router.get('/reviews', authenticateToken, isAdmin, getAllReviews);
router.post('/reviews', authenticateToken, isAdmin, createReview);
router.delete('/reviews/:id', authenticateToken, isAdmin, deleteReview);

export default router;
