import request from "supertest";
import app from "../app.js";
import Vehicle from "../models/Vehicle.js";

describe("Vehicle API", () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  test("POST /api/vehicles → should create a vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .send({ name: "Truck A", capacityKg: 1000, tyres: 6 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Truck A");
  });
});
