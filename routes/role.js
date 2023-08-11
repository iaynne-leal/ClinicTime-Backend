import { Router } from "express";
import { roleGet, rolePost, rolePut, roleDelete  } from "../controllers/role.js"
const router = Router();

//rutas
router.get('/', roleGet);

router.post('/', rolePost);

router.put('/:pk', rolePut);

router.delete('/:pk', roleDelete);


export {router as routerRole};