import Task from "../model/task.js"
import Usuario from "../model/user.js"


const getTask = async (req, res) => {
    const id = req.header("id");
    if(!id) {
        return res.status(404).json({
            msg:"El usuario no existe"
        })
    }
    const usuarios = await Usuario.findById(id).populate("tareas", {
        tarea:1,
        complete:1,
    });
    res.json(usuarios.tareas)
}

const postTask = async (req, res) => {
    const {tarea, complete=false} = req.body;
    if(!tarea){
        return res.json({
            msg:"fixed bug about sending tasks without content and error message"
        })
    }
    const id = req.header("id");
    const usuario = await Usuario.findById(id);
    const task = new Task({tarea, complete, id: usuario._id});
    const newTarea = await task.save();
    usuario.tareas = usuario.tareas.concat(newTarea._id)
    usuario.save();
    
    res.json({
        task,
    })
}

const putTask = async (req, res) => {
    const {id} = req.params;
    const {tarea, complete} = req.body;
    const newTarea = {
        tarea,
        complete: complete ? false : true
    }

    await Task.findByIdAndUpdate(id, newTarea, {new:true})
            .then(result => {
                res.json(result)
            })
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    
    //BORRAR RECOMENDADO
    await Task.findByIdAndDelete(id)
        .then(() => res.status(204).end())
        .catch(error => console.log(error))
}

const deleteAllTasks = async (req, res) => {
    await Task.deleteMany({})
        .then(() => res.status(204).end())
        .catch(error => console.log(error))
}

export {
    getTask,
    postTask,
    putTask,
    deleteTask,
    deleteAllTasks
}