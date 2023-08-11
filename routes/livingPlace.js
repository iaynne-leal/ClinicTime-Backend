import { Router } from "express";
import { livingGet, livingPost, livingPut, livingDelete } from "../controllers/livingPlace"

const router = Router();
//rutas
router.get('/', livingGet);

router.post('/', livingPost);

router.put('/:pk', livingPut);

router.delete('/:pk', livingDelete);


export {router};