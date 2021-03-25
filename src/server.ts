import * as dotenv from 'dotenv';
dotenv.config();
import {app} from './app';
import {PORT} from './framework/environment';

const port = PORT;

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });