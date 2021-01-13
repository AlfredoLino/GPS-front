import Joi from "joi"

const validator = Joi.object({
    tipoProyecto: Joi.string().min(1).required(),
    planteamiento: Joi.string().min(1).required(),
    justificacion: Joi.string().min(1).required(),
    alcances: Joi.string().min(1).required(),
    limityRest: Joi.string().min(1).required()
})

export default validator