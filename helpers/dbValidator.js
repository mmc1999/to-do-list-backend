import Usuario from "../model/user.js";

const esEmailValido = async (correo = "") => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail) {
        //EL RETURN ES FUNDAMENTAL YA QUE FRENA EL CODIGO DE LA FUNCION Y LA CORTA ACA
        throw new Error(`El CORREO ${correo} ya esta registrado en la base de datos`); 
    }
}

export default esEmailValido