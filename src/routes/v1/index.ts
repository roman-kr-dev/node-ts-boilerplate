import express from 'express';
import { validateRequest, validateResponse } from '../../middleware/validate';
import { wikiService } from '../../services';
import { responsePending, responseResult } from '../../middleware/responses';
import { wikiSchema } from '../../models';

const router = express.Router();

type CRUD = 'get' | 'post' | 'put' | 'delete' | 'all';

interface ApiRoute {
  method: CRUD;
  path: string;
  service: any;
  schema: any;
}

type ApiRoutes = Array<ApiRoute>;

const apiRoutes: ApiRoutes = [
  {
    method: 'get',
    path: '/introduction/:article',
    service: wikiService,
    schema: wikiSchema,
  }
];

apiRoutes.forEach((route: ApiRoute) => {
  router[route.method](route.path, [
    validateRequest(route.schema),
    responsePending,
    route.service,
    validateResponse(route.schema),
    responseResult,
  ]);
});

export default router;