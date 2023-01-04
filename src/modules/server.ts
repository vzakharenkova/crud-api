import { createServer } from 'http';
import { users } from '../data/users.js';

import { createLoadBalancer } from './loadBalancer.js';
import { ServerService } from './serverService.js';

const HOST = process.env.HOST || 'localhost';

export function createNewServer(port: number) {
  const server = createServer();

  server
    .on('request', (req, res) => {
      if (process.env.NODE_ENV === 'multi' && port === Number(process.env.PORT)) {
        const db = users;
        createLoadBalancer(req, res);

        return;
      }

      const serverService = new ServerService(req, res);

      try {
        switch (req.method) {
          case 'GET': {
            serverService.get();
            break;
          }
          case 'POST': {
            serverService.post();
            break;
          }
          case 'PUT': {
            serverService.put();
            break;
          }
          case 'DELETE': {
            serverService.delete();
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

  server.listen(port, HOST, () => console.log(`Server is running on http://${HOST}:${port}`));
}
