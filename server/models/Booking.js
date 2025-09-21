import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    fromPincode: { type: String, required: true },
    toPincode: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    customerId: { type: String, required: true },
}, { timestamps: true });

const Booking = model('Booking', bookingSchema);
export default Booking;