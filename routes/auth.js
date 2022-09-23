import { Router } from "express";
import {check} from "express-validator"
import authUser from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarcampos.js";

const routeAuth = Router();

routeAuth.post("/",[
    check("correo", "El correo ingresado es inexistente").isEmail(),
    check("password", "La contraseña ingresada es incorrecta").not().isEmpty(),
    validarCampos
],authUser)

export default routeAuth