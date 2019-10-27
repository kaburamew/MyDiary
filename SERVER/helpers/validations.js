import Joi from '@hapi/joi';

const schema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(30)
    .required(),
  lastname: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});

export default schema;
