import Joi from "joi"

const validator = Joi.object({
    cronograma: Joi.array().items(Joi.object({
        responsables: Joi.array().items(Joi.string()).min(1),
        nombreActividad: Joi.string().required(),
        nactividad: Joi.number().required(),
        entrega: Joi.string().required()
    })).unique('nombreActividad').required().min(1),
    impactoProyecto: Joi.string().min(1).required(),
    productoEntrega: Joi.array().items(Joi.string()).required().min(1)
})

export default validator