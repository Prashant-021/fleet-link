import request from "supertest";
import app from "../app.js";
import Vehicle from "../models/Vehicle.js";
import Booking from "../models/Booking.js";

describe("Booking API", () => {
  let vehicle;

  // Clear DB before each test
  beforeEach(async () => {
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});

    // Create a test vehicle
    vehicle = await Vehicle.create({
      name: "Van 1",
      capacityKg: 1500,
      tyres: 4,
    });
  });

  test("POST /api/bookings → should create a booking if vehicle is available", async () => {
    const res = await request(app).post("/api/bookings").send({
      vehicleId: vehicle.id,
      fromPincode: "110001",
      toPincode: "110020",
      startTime: "2023-10-27T10:00:00Z",
      customerId: "cust123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.vehicleId).toBe(vehicle.id);
    expect(res.body.customerId).toBe("cust123");
  });

  test("POST /api/bookings → should prevent double booking (conflict)", async () => {
    // First booking
    await request(app).post("/api/bookings").send({
      vehicleId: vehicle.id,
      fromPincode: "110001",
      toPincode: "110020",
      startTime: "2023-10-27T10:00:00Z",
      customerId: "cust1",
    });

    // Overlapping booking
    const res = await request(app).post("/api/bookings").send({
      vehicleId: vehicle.id,
      fromPincode: "110005",
      toPincode: "110010",
      startTime: "2023-10-27T10:30:00Z", // overlaps with first
      customerId: "cust2",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.error).toMatch(/Vehicle already Booked in this time slot/i);
  });

  test("POST /api/bookings → should return 404 if vehicle not found", async () => {
    const res = await request(app).post("/api/bookings").send({
      vehicleId: "652f9b2b6a0c2b99f9d9e123", // fake ObjectId
      fromPincode: "110001",
      toPincode: "110020",
      startTime: "2023-10-27T10:00:00Z",
      customerId: "cust999",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toMatch(/Vehicle not found/i);
  });
});
