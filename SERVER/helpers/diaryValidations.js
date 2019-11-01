import Joi from '@hapi/joi';
const schema = Joi.object({

    title : Joi.string()
    .min(3)
    .max(30)
    .required(),
    description : Joi.string()
    .min(3)
    .max(30)
    .required(),
});

export default schema;