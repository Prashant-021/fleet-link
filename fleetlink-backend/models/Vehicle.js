import { Schema, model } from "mongoose";

const vehicleSchema = new Schema({
    name: { type: String, required: true},
    capacityKg: {type: Number, required: true},
    tyres: {type: Number, required: true},
})

const Vehicle = model("Vehicle", vehicleSchema);
export default Vehicle;