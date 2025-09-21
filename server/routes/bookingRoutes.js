import express from 'express';
import { createBooking, deleteBooking, getBookings } from '../controllers/bookingController.js'

const router = express.Router();

router.post('/', createBooking)
router.get('/list', getBookings)
router.delete('/delete/:bookingId', deleteBooking)

export default router;