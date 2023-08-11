import { Router } from "express";
import { patientGet, patientPost, patientPut, patientDelete } from "../controllers/patient"

const router = Router();

//rutas
router.get('/', patientGet);

router.post('/', patientPost);

router.put('/:pk', patientPut);

router.delete('/:pk', patientDelete);


export {router};