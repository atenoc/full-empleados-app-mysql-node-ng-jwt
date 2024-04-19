import { Router } from "express";

import { verificarToken } from "../controllers/verificarToken.js";
import { createRegistro, login, getRestringido } from "../controllers/seguridad.controller.js";

const router = Router();

//const valida = require('../controllers/verificarToken')
//const segController = require('../controllers/seguridad.controller.js')

router.post('/registro', createRegistro)
router.post('/login', login)
router.get('/restringido', verificarToken, getRestringido)

export default router;
