import Joi from 'joi';
import { baseRequesteSchema, baseResponseSchema } from './base.models';

const params = baseRequesteSchema.append({
  article: Joi.string().regex(/^[\w\-]+$/i).required()
}).unknown();

const response = baseResponseSchema
  .append({
    scrapeDate: Joi.date().required(),
    articleName: Joi.string().required(),
    introduction: Joi.string().required(),
  })
  .unknown();

export { params, response };