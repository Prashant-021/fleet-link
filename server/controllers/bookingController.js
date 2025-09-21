import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import { calcRideDuration } from "../utils/calcRideDuration.js";


export const createBooking = async (req, res) => {
    try {
        const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;
        if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const vehicle = await Vehicle.findById(vehicleId)
        if (!vehicle) return res.status(404).json({ error: "Vehicle not found" })

        const duration = calcRideDuration(fromPincode, toPincode);
        const start = new Date(startTime);
        const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

        const conflict = await Booking.findOne({
            vehicleId,
            startTime: { $lt: end },
            endTime: { $gt: start }
        });
        console.log(conflict);

        if (conflict) {
            return res.status(409).json({ error: 'Vehicle already Booked in this time slot' })
        }

        const booking = await Booking.create({
            vehicleId, fromPincode, toPincode, startTime: start, endTime: end, customerId
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 }).lean().populate('vehicleId') // This replaces vehicleId with full vehicle object
            .exec();
        res.json({ bookings })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}