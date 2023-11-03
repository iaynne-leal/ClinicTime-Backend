import { Router } from 'express';
import {login} from '../controllers/auth.js'


const router = Router();
router.post('/login',login);




export {router as routerAuth};