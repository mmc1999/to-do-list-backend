import Usuario from "../model/user.js";
import jwt from "jsonwebtoken"

export const validarJWT = async (req, res, next) => {
    const token = req.header("token");
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRETRPRIVATEKEY);
        //leer el usuario q correpsonde al id
        const usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(401).json({
                msg:"Token no valido - usuario no existente"
            })
        }

        /*if(!usuario.estado){
            return res.status(401).json({
                msg:"Token no valido - usuario con estado false"
            })
        }*/

        req.usuario = usuario;
        next()  
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:"token no valido"
        }) 
    }
    
    
}