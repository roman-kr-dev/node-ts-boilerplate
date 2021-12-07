import { Request, Response, NextFunction } from 'express';
import logger from '../logger';
import { ResponseStatus } from '../types';
import responseCallback from './callback';

export const responsePending = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request body for: ${req.path} - ${JSON.stringify(req.body, null, 2)}`);

  if (req.body.callback) {
    res.json({ success: true, status: ResponseStatus.PENDING });
  }

  next();
};

export const responseResult = (req: Request, res: Response) => {
  res.locals.serviceReponse.success = !res.locals.serviceReponse.error;
  res.locals.serviceReponse.debug = {
    mode: process.env.MODE
  };

  logger.info(`Response json for ${req.path} - ${JSON.stringify(res.locals.serviceReponse, null, 2)}`);

  if (req.body.callback) {
    if (res.locals.serviceReponse.rejected) {
      return;
    }

    responseCallback(req.body.callback, res.locals.serviceReponse);
  } else {
    res.json(res.locals.serviceReponse);
  }
};
