import Joi from "joi";

const taskSchema = {
  
    task: Joi.object({
      title: Joi.string().trim().min(5).max(30).required(),
      description: Joi.string().trim().min(10).max(300).required(),
      status: Joi.string().valid("Pending", "In-Progress", "Completed").default("Pending"),
      priority: Joi.string().valid("Low", "Medium", "High").required(),
      dueDate: Joi.date().iso().required(),
    }),

    taskfilter: Joi.object({
      page: Joi.number().min(1).default(1),
      filter: Joi.object({
        status: Joi.string().valid("Pending", "In-Progress", "Completed"),
        priority: Joi.string().valid("Low", "Medium", "High"),
        dueDate: Joi.date().iso()
      })
    }),

    taskUpdateParmas: Joi.object({
      taskId: Joi.string().required()
    }),

    taskUpdateBody: Joi.object({
      status: Joi.string().valid("Pending", "In-Progress", "Completed"),
      priority: Joi.string().valid("Low", "Medium", "High"),
    }),

    taskDeleteParmas: Joi.object({
      taskId: Joi.string().required()
    })

}

export default taskSchema;

