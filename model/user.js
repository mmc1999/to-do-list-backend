import {Schema, model} from "mongoose";

const userSchema = Schema({
    nombreUsuario:{
        type:String,
        required:[true, "El nombre de usuario es requerido"]
    },
    correo: {
        type:String,
        unique:true,
        required:[true, "El correo es requerido"]
    },
    password:{
        type:String,
        required:[true, "La contraseña es requerida"]
    },
    estado: {
        type:Boolean,
        default:false
    },
    tareas:[{
        type:Schema.Types.ObjectId, 
        ref:"tarea"
    }]
})

userSchema.set("toJSON",{
    transform:(doc, retuendObject) => {
        retuendObject.id = retuendObject._id;
        delete retuendObject._id
        delete retuendObject.__v
    }
})

userSchema.methods.toJSON = function () {
    const {password, __v, ...user} = this.toObject()
    return user
}


const Usuario = model("usuario", userSchema)

export default Usuario;