# Fleet Link Project

This project is a full-stack application consisting of a React frontend and an Express backend. It is designed to manage vehicle bookings efficiently.

## Folder Structure

```
  - client/
    - eslint.config.js
    - index.html
    - package-lock.json
    - package.json
    - public/
      - vite.svg
    - README.md
    - src/
      - App.css
      - App.jsx
      - components/
        - AddVehicleForm.jsx
        - BackButton.jsx
        - HeaderComp.jsx
        - VehicleList.jsx
      - index.css
      - lib/
        - apis.js
      - main.jsx
      - pages/
        - AddVehicle.jsx
        - Home.jsx
        - SearchAndBook.jsx
        - ViewBookings.jsx
      - utils/
        - notifications.js
    - vite.config.js
  - server/
    - config/
      - db.js
    - controllers/
      - bookingController.js
      - vehicleController.js
    - models/
      - Booking.js
      - Vehicle.js
    - package-lock.json
    - package.json
    - routes/
      - bookingRoutes.js
      - vehicleRoutes.js
    - server.js
    - tests/
      - booking.test.js
      - vehicle.test.js
    - app.js
    - babel.config.js
    - jest.config.js
    - jest.setup.js
    - utils/
      - calcRideDuration.js
```

## How to Run

### Prerequisites

- Node.js and npm installed on your machine.

### Running the Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Running the Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

## Features

- **Vehicle Management**: Add, view, and manage vehicles.
- **Booking System**: Book vehicles and manage bookings.
- **Responsive Design**: User-friendly interface for all devices.
- **API Integration**: Seamless communication between frontend and backend.

## Special Functions

### Client-side Functions

1. **`api(path)`**: Constructs a full API URL by appending the given path to the base API URL.

2. **`addVehicleAPI(payload)`**: Sends a POST request to add a new vehicle with the provided payload.

3. **`getVehicles()`**: Fetches all vehicles from the server.

4. **`deleteVehicle(vehicleId)`**: Sends a DELETE request to remove a vehicle by its ID.

5. **`searchAvailableVehicles(params)`**: Searches for available vehicles based on query parameters.

6. **`createBooking(payload)`**: Sends a POST request to create a new booking with the provided payload.

7. **`getBookings()`**: Fetches all bookings from the server.

8. **`deleteBooking(bookingId)`**: Sends a DELETE request to remove a booking by its ID.

### Server-side Functions

#### Booking Controller

1. **`createBooking(req, res)`**: Creates a new booking if the vehicle is available for the specified time slot.

2. **`getBookings(req, res)`**: Retrieves all bookings, sorted by creation date, and populates vehicle details.

3. **`deleteBooking(req, res)`**: Deletes a booking by its ID if it exists.

#### Vehicle Controller

1. **`addVehicle(req, res)`**: Adds a new vehicle to the database.

2. **`getAllVehicles(req, res)`**: Retrieves all vehicles, sorted by creation date.

3. **`deleteVehicle(req, res)`**: Deletes a vehicle by its ID if it is not currently booked.

4. **`getAvailableVehicles(req, res)`**: Finds available vehicles based on capacity and time constraints, and estimates ride duration.

### Utility Function

- **`calcRideDuration(fromPincode, toPincode)`**: Calculates the ride duration based on the difference between two pin codes, returning the duration in hours.

This README provides an overview of the project structure, setup instructions, and key features. For more detailed information, please refer to the individual README files in the client and server directories.
