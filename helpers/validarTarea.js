const validarTarea = (req, res, next) => {
    console.log(req.body)
    next()
}

export default validarTarea