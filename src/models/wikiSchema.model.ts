import Joi from 'joi';
import { baseRequesteSchema, baseResponseSchema } from './base.models';

const params = baseRequesteSchema.append({
  article: Joi.string().regex(/^[\w\-]+$/i).required()
}).unknown();

const response = baseResponseSchema
  .append({
  })
  .unknown();

export { params, response };