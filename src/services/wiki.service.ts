import wiki from 'wikijs';
import { Request, Response, NextFunction } from 'express';

const service = async (req: Request, res: Response, next: NextFunction) => {
  const articleName = req.params.article;

  try { 
    const page = await wiki().page(articleName);
    const introduction = await page.summary();

    res.locals.serviceReponse = {
      scrapeDate: new Date().toISOString(),
      articleName,
      introduction
    }
;
  } catch (e) {
    res.locals.serviceReponse = { error: `Summery not found for this term: ${articleName}` };
  }

  return next();
}

export default service;