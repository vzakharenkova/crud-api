import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { deleteFn } from './modules/delete.js';
import { get } from './modules/get.js';
import { post } from './modules/post.js';
import { put } from './modules/put.js';
import { users } from './modules/users.js';

dotenv.config();

const server = createServer();

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || 'localhost';

server
  .on('request', (req, res) => {
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
  })
  .on('error', (error) => console.log(error.message))
  .on('close', () => console.log('Goodbye!'));

server.listen(PORT, HOST, () => console.log(`Server is running on http://${HOST}:${PORT}`));
