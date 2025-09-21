
import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import { calcRideDuration } from '../utils/calcRideDuration.js';

export const addVehicle = async (req, res) => {
    try {
        const { name, capacityKg, tyres } = req.body;
        if (!name || !capacityKg || !tyres) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const vehicle = await Vehicle.create({ name, capacityKg, tyres });
        res.status(201).json(vehicle)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean()
        res.json({ vehicles })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Vehicle ID is required' });
        }
        const vehicle = await Vehicle.findByIdAndDelete(id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getAvailableVehicles = async (req, res) => {
    try {
        const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
        if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const duration = calcRideDuration(fromPincode, toPincode);
        const start = new Date(startTime);
        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

        let vehicles = await Vehicle.find({ capacityKg: { $gte: parseInt(capacityRequired) } });

        const bookedVehicles = await Booking.find({
            vehicleId: { $in: vehicles.map(v => v._id) },
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        }).distinct("vehicleId")

        vehicles = vehicles.filter(v => !bookedVehicles.includes(v._id.toString()));

        res.json({
            estimatedRideDurationHours: duration,
            availableVehicles: vehicles
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}