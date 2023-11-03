import { Router } from "express";
import { appoinmentGet, appoinmentPost, appoinmentPut, appoinmentDelete } from "../controllers/appoiment.js"

const router = Router();

//rutas
router.get('/', appoinmentGet);

router.post('/', appoinmentPost);

router.put('/:pk', appoinmentPut);

router.delete('/:pk', appoinmentDelete);


export {router  as routerApoiment };