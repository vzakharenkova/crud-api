import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { get } from './modules/get.js';

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
        break;
      }
      case 'PUT': {
        break;
      }
      case 'DELETE': {
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
