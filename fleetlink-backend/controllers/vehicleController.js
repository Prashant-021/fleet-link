
import Vehicle from '../models/Vehicle';
import Booking from '../models/Booking';
import { calcRideDuration } from '../utils/calcRideDuration';

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

export const getAbailableVehicles = async (req, res) => {
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

        res.json(vehicles.map(v => ({
            ...v.toObject(),
            estimatedRideDurationHours: duration
        })));
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}