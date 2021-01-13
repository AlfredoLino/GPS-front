import Joi from "joi"

const validator = Joi.object({
    cronograma: Joi.array().items(Joi.object({
        responsables: Joi.array().items(Joi.string()).min(1),
        nombreActividad: Joi.string().required(),
        nactividad: Joi.number().required(),
        entrega: Joi.string().required()
    })),
    impactoProyecto: Joi.string().min(1),
    producto: Joi.array().items(Joi.string())
})

export default validator