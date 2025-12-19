import Joi from "joi";

const authSchema = {
  
    register: Joi.object({
      userName: Joi.string().trim().required(),
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().min(6).required(),
    }),

    loginSchema: Joi.object({
      email: Joi.string().email().trim().lowercase().required(),
      password: Joi.string().required(),
    })
}

export default authSchema;

