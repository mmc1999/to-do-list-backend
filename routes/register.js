import {Router} from "express";
import {check, body} from "express-validator";

import { getUser, postUser } from "../controllers/register.js";
import esEmailValido from "../helpers/dbValidator.js";
import { validarCampos } from "../middlewares/validarcampos.js";

const routerRegister = Router();

routerRegister.get("/", getUser);

routerRegister.post("/",[
    check("nombreUsuario", "El nombre de usuario es requerido").not().isEmpty(),
    check("correo", "No es un formato valido para el correo").isEmail(),
    check("password", "La contreseña es requerida").not().isEmpty(),
    body("correo").custom(esEmailValido),
    validarCampos
], postUser)

export default routerRegister