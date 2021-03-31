import type {NextFunction, Request, Response} from 'express';

function requestMiddleware (_req: Request, _res: Response, next: NextFunction): void {
  console.log(`Request URL: ${_req.url}\
  \nRequest type: ${_req.method}\
  \nRequest param: ${JSON.stringify(_req.body)}`);
  next();
}

export default requestMiddleware;