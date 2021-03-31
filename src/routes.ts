import express from 'express';

const router = express.Router();

export = (): express.Router => {
  router.get('/', (_req: express.Request, _res: express.Response) => {
    _res.end('Stock Reminder');
  });

  return router;
};