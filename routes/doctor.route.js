// routes/doctorRoutes.js

const express = require('express');
const doctorRouter = express.Router();
const { requireAuth } = require('../config/auth');
const { DoctorModel } = require('../models/doctor.model'); // Import your DoctorModel

// Create a new doctor appointment
doctorRouter.post('/appointments', requireAuth, async (req, res) => {
  try {
    const {
      name,
      imageURL,
      specialization,
      experience,
      location,
      slots,
      fee,
    } = req.body;

    const doctor = new DoctorModel({
      name,
      imageURL,
      specialization,
      experience,
      location,
      slots,
      fee,
    });

    await doctor.save();

    res.status(201).json({ message: "New Appointment Created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error });
  }
});

// Get all doctor appointments
doctorRouter.get('/appointments', async (req, res) => {
  try {
    const doctors = await DoctorModel.find();
    res.json({ doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error });
  }
});

// Update a doctor appointment
doctorRouter.put('/appointments/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ updatedDoctor, message: "Doctor Data Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error });
  }
});

// Delete a doctor appointment
doctorRouter.delete('/appointments/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await DoctorModel.findByIdAndRemove(id);

    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ deletedDoctor, message: "Doctor Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', message: error });
  }
});

module.exports = { doctorRouter };