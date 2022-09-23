import express from "express";
import cors from "cors";
import * as dotenv from 'dotenv';
import { connectingDatabase } from "./database/config.js";
import routerRegister from "./routes/register.js";
import routeAuth from "./routes/auth.js";
import routeTask from "./routes/task.js";

const PORT = process.env.PORT || 8080;
const app = express();

//para acceder a las variables de entorno
dotenv.config()

//DATABASE 
await connectingDatabase();

//express
app.use(express.json());
app.use(cors());

app.use("/register/user", routerRegister);
app.use("/auth/user", routeAuth);
app.use("/api/task", routeTask);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

