import bcryptjs from "bcryptjs"
import generarJWT from "../helpers/generar-jwt.js";
import Usuario from "../model/user.js";

const authUser = async (req, res) => {
    const {correo, password} = req.body;
    try {
        //si es un usuario existente
        const usuario = await Usuario.findOne({correo});
        
        if(!usuario) {
            return res.status(400).json({
                msg: "There is no user with that email"
            })
        }
        
        //comparar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: "Incorrect password"
            })
        }
        //generar un token
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token,
            ok:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje:"Algo salio mal"
        })
    }
}

export default authUser