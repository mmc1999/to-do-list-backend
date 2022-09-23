import { Schema, model } from "mongoose";

const taskSchema = Schema({
    tarea: {
        type:String,
        required:[true, "La tarea es requerida"]
    },
    complete: {
        type:Boolean,
        default:false
    },
    userId: {
        type:Schema.Types.ObjectId,
        ref:"usuario"
    }
})

taskSchema.set("toJSON",{
    transform:(doc, retuendObject) => {
        retuendObject.id = retuendObject._id;
        delete retuendObject._id
        delete retuendObject.__v
    }
})

const Task = model("tarea", taskSchema);

export default Task;