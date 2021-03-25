import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes';
import requestMiddleware from './framework/middleware/request.middleware';
import jsonErrorHandler from 'express-json-error-handler';

export const app = express();
const PORT = 3023;

/* Init middleware */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(requestMiddleware);
app.use(jsonErrorHandler());

/* Init routes */
app.use('/api/v1', Routes());
