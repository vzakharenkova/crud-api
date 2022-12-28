import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { deleteFn } from './modules/delete.js';
import { get } from './modules/get.js';
import { post } from './modules/post.js';
import { put } from './modules/put.js';

dotenv.config();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  const server = createServer();

  const PORT = Number(process.env.PORT) || 5000;
  const HOST = process.env.HOST || 'localhost';

  server
    .on('request', (req, res) => {
      try {
        switch (req.method) {
          case 'GET': {
            get(req, res);
            break;
          }
          case 'POST': {
            post(req, res);
            break;
          }
          case 'PUT': {
            put(req, res);
            break;
          }
          case 'DELETE': {
            deleteFn(req, res);
            break;
          }
          default:
            res.writeHead(400, 'No Response', { 'Content-Type': 'text/plain' });
            res.end(res.statusMessage);
        }
      } catch {
        res.writeHead(500, 'Smth went wrong! Please try again!', { 'Content-Type': 'text/plain' });
        res.end(res.statusMessage);
      }
    })
    .on('error', (error) => console.log(error.message))
    .on('close', () => console.log('Goodbye!'));

  server.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
} else {
  console.log('Not implemented');
}
