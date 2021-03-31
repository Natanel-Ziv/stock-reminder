import {app} from './app';
import {PORT} from './framework/environment';

require('./functions/chatbot');

const port = PORT;

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});