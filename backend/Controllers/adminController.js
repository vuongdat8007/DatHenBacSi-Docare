// Import necessary models
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Appointment from '../models/BookingSchema.js';
import Review from '../models/ReviewSchema.js';

// User controllers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};


// Doctor controllers
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

export const createDoctor = async (req, res) => {
  const { name, specialty } = req.body;
  try {
    const newDoctor = new Doctor({ name, specialty });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating doctor' });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialty } = req.body;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(id, { name, specialty }, { new: true });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor' });
  }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ message: 'Doctor deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor' });
  }
};


// Appointment controllers
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctor').populate('patient');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

export const createAppointment = async (req, res) => {
  const { doctor, patient, date } = req.body;
  try {
    const newAppointment = new Appointment({ doctor, patient, date });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { doctor, patient, date } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { doctor, patient, date }, { new: true });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment' });
  }
};

// Review controllers
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('doctor').populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const createReview = async (req, res) => {
  const { doctor, user, reviewText, rating } = req.body;
  try {
    const newReview = new Review({ doctor, user, reviewText, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review' });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review' });
  }
};