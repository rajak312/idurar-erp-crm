const Joi = require('joi');

const queryUpdateSchema = Joi.object({
  status: Joi.string().valid('Open', 'InProgress', 'Closed').optional(),
  resolution: Joi.string().allow('').optional(),
  notes: Joi.array()
    .items(
      Joi.object({
        content: Joi.string().required(),
        createdAt: Joi.date().optional(),
        _id: Joi.string().optional(),
      })
    )
    .optional(),
}).min(1);

module.exports = queryUpdateSchema;
