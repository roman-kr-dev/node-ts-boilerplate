import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import config from '../config';

const validationError = (res: Response, error: any) => {
  return res.status(400).json({ error: error.details.map((details: any) => details.message).join(', ') });
}

const validateWithSchema = (schema: any, body: any) => {
  const { value, error } = Joi.compile(schema)
    .prefs({ errors: { label: 'key' } })
    .validate(body);

  return { value, error};
}

export const validateRequest = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  if (schema.params) {
    const { value: params, error } = validateWithSchema(schema.params, req.params);

    if (error) {
      return validationError(res, error);
    }

    req.params = params;
  }

  if (schema.query) {
    const { value: query, error } = validateWithSchema(schema.query, req.query);

    if (error) {
      return validationError(res, error);
    }

    req.query = query;
  }

  if (schema.body) {
    const { value: body, error } = validateWithSchema(schema.body, req.body);

    if (error) {
      return validationError(res, error);
    }

    req.body = body;
  }

  return next();
};

export const validateResponse = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  if (!schema.response) {
    return next();
  }

  if (config.validateResponse && !res.locals.serviceReponse.error) {
    const { error } = Joi.compile(schema.response)
      .prefs({ errors: { label: 'key' } })
      .validate(res.locals.serviceReponse);

    if (error) {
      return res.status(400).json({ error: error.details.map((details) => details.message).join(', ') });
    }
  }

  return next();
};
