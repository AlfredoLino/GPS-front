import Joi from "joi"

const validator = Joi.object({
    asignaturas: Joi.array().items(Joi.object({
        nombre: Joi.string().required(),
        compDes: Joi.string(),
        compPrev: Joi.string(),
        semestre: Joi.string(),
        etapa_one: Joi.string().required(),
        etapa_two: Joi.string().required(),
        etapa_three: Joi.string().required()
    })).min(1)
})

export default validator;