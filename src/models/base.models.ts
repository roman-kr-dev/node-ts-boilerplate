import Joi from 'joi';

export const baseRequesteSchema = Joi.object({
  callback: Joi.object({
    url: Joi.string().uri().required(),
  }).unknown(),
});

export const baseResponseSchema = Joi.object({
  success: Joi.boolean(),
}).unknown();
