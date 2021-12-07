import wiki from 'wikijs';
import { Request, Response, NextFunction } from 'express';

const service = async (req: Request, res: Response, next: NextFunction) => {
  const article = req.params.article;

  try { 
    const page = await wiki().page(article);
    const summery = await page.summary();

    res.locals.serviceReponse = { summery };
  } catch (e) {
    res.locals.serviceReponse = { error: `Summery not found for this term: ${article}` };
  }

  return next();
}

export default service;