import jwt from "jsonwebtoken"

const generarJWT = (id) => {
        //genero una promesa por que quiero que trabje en base a promesas
        return new Promise((resolve, reject) => {
            const payload = {id};
            jwt.sign(payload, process.env.SECRETRPRIVATEKEY, {
                expiresIn:"10d"
            },(err, token)=> {
                if(err){
                    console.log(err)
                    reject("no se pudo generar el token")
                } else {
                    resolve(token)
                }
    
            })
        })
}

export default generarJWT