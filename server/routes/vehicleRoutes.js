import express from 'express';
import { addVehicle, deleteVehicle, getAllVehicles, getAvailableVehicles} from '../controllers/vehicleController.js';

const router = express.Router();

router.post('/', addVehicle);
router.get('/available', getAvailableVehicles);
router.get('/getAll', getAllVehicles);
router.delete('/delete/:id', deleteVehicle);

export default router;