import Joi from "joi"

const validator = Joi.object(
    {
        institucion: Joi.string().min(1).required(),
        profResp: Joi.string().required(),
        departamentos: Joi.array().min(1).required(),
        alumnos: Joi.array().min(1).required(),
        tituloProInt: Joi.string().required(),
        colab: Joi.string().required(),
        cliente: Joi.string().required(),
        materiaEje: Joi.string().min(3).required(),
        periodo: Joi.object({
            inicio: Joi.required(),
            fin: Joi.required()
        }),
        areaConoc: Joi.string().required(),
        tipoEjec: Joi.string().required(),
    }
) 

export default validator