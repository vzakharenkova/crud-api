import { createServer } from 'http';
import { serverErrorHandler } from '../utils/errors.js';

import { CONTENT_TYPE, STATUSE_CODE, URL_PARAM } from '../utils/shared.js';
import { createLoadBalancer } from './loadBalancer.js';
import { ServerService } from './serverService.js';

const HOST = process.env.HOST || URL_PARAM.HOST;

export function createNewServer(port: number) {
  const server = createServer();

  const serverService = new ServerService();

  server
    .on('request', (req, res) => {
      if (process.env.NODE_ENV === 'multi' && port === Number(process.env.PORT)) {
        createLoadBalancer(req, res);

        return;
      }

      try {
        switch (req.method) {
          case 'GET': {
            serverService.get(req, res);
            break;
          }
          case 'POST': {
            serverService.post(req, res);
            break;
          }
          case 'PUT': {
            serverService.put(req, res);
            break;
          }
          case 'DELETE': {
            serverService.delete(req, res);
            break;
          }
          default:
            res.writeHead(STATUSE_CODE.BAD_REQUEST, 'No Response', CONTENT_TYPE.TEXT);

            res.end(res.statusMessage);
        }
      } catch {
        serverErrorHandler(req, res);
      }
    })
    .on('error', (error) => {
      if (error.message.includes('EADDRINUSE')) {
        console.log(`Port ${port} is already in use!`);

        process.exit();
      } else {
        console.log('Smth went wrong. Please try again!');

        process.exit();
      }
    })
    .on('close', () => console.log('Goodbye!'));

  server.listen(port, HOST, () => console.log(`Server is running on http://${HOST}:${port}`));
}
