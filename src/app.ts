import * as dotenv from 'dotenv';
import express from 'express';
import jsonErrorHandler from 'express-json-error-handler';
import Routes from './routes';
import requestMiddleware from './framework/middleware/request.middleware';

dotenv.config();

export const app = express();


/* Init middleware */
app.use(express.urlencoded({
  extended: false
}));
app.use(requestMiddleware);
app.use(jsonErrorHandler());

/* Init routes */
app.use('/api/v1', Routes());
