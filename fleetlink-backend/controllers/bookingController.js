import Booking from "../models/Booking";
import Vehicle from "../models/Vehicle";
import { calcRideDuration } from "../utils/calcRideDuration";


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
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });
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