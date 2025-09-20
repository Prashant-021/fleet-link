const monggoose = require('mongoose');

const bookingSchema = new monggoose.Schema({
    vehicleId: { type: monggoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    fromPincode: { type: String, required: true },
    toPincode: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    customerId: { type: String, required: true },
});

module.exports = monggoose.model('Booking', bookingSchema);