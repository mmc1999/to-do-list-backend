import { Router } from "express";
import { check } from "express-validator";
import { deleteTask, getTask, postTask, putTask, deleteAllTasks } from "../controllers/task.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {validarCampos} from "../middlewares/validarcampos.js"

const routeTask = Router();


routeTask.get("/", getTask);

routeTask.post("/", [
    validarJWT,
    check("tarea", "La tarea es requerida"),
    validarCampos
],postTask);

routeTask.put("/:id", putTask)

routeTask.delete("/:id", deleteTask)

routeTask.delete("/eliminartodo/:id", deleteAllTasks)

export default routeTask;