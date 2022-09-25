import bcryptjs from "bcryptjs"
import Usuario from "../model/user.js";

//despues borrar esta ruta por que no sirve solo es para ver los usuarios
/*const getUser = async (req, res) => {
    const usuarios = await Usuario.find({}).populate("tareas", {
        tarea:1,
        complete:1,
    });
    res.json(usuarios)
}*/

const postUser = async (req, res) => {
    const {correo, nombreUsuario, password} = req.body;
    const usuario = new Usuario({correo, nombreUsuario, password});
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    })
}

export {
    //getUser,
    postUser
}