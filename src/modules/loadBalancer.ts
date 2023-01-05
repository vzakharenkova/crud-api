import cluster from 'cluster';
import http, { request } from 'http';
import { cpus } from 'os';
import { users } from '../data/users.js';

import { invalidDataErrorHandler } from '../utils/errors.js';

const PORT = Number(process.env.PORT) || 5000;

const HOST = process.env.HOST || 'localhost';

let counter = 0;

export function createLoadBalancer(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  const bodyData: Buffer[] = [];

  if (cluster.workers) {
    const workers = Object.values(cluster.workers);

    for (const worker of workers) {
      if (worker) {
        worker.send(users);
      }
    }
  }

  req
    .on('data', (chunk) => {
      bodyData.push(chunk);
    })
    .on('end', () => {
      if (bodyData.length) {
        try {
          connector.write(Buffer.concat(bodyData));

          req.pipe(connector);

          connector.end();
        } catch {
          invalidDataErrorHandler(res, false);

          return;
        }
      }
    })
    .on('error', () => {
      res.writeHead(500, 'Smth went wrong! Please try again!', {
        'Content-Type': 'text/plain',
      });

      res.end(res.statusMessage);
    });

  counter++;

  if (counter > cpus().length) {
    counter = 1;
  }

  const connector = request(
    `http://${HOST}:${PORT + counter}${req.url}`,
    { headers: req.headers, method: req.method },
    (response) => {
      response.pipe(res);

      res.writeHead(<number>response.statusCode, { ...response.headers });

      console.log(`Request has been handled on ${response.socket.remotePort} port.`);
    },
  );
}
