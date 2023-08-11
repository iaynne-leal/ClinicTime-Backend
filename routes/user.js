import { Router } from "express";
import{ userGet, userPost, userPut, userDelete } from "../controllers/user.js"

const router = Router();

//rutas
router.get('/', userGet);

router.post('/', userPost);

router.put('/:pk', userPut);

router.delete('/:pk', userDelete);


export {router as routerUser};