import cluster from 'cluster';
import http from 'http';

import { users } from '../data/users.js';
import {
  invalidDataErrorHandler,
  invalidRequestUrlErrorHandler,
  serverErrorHandler,
} from './errors.js';
import { CONTENT_TYPE, STATUSE_CODE } from './shared.js';
import { isNewUser } from './user.js';
import { generateUUID } from './uuid.js';

export function post(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (req.url === '/api/users' || (process.env.NODE_ENV === 'multi' && req.url === '/api')) {
    const data: Buffer[] = [];

    req
      .on('data', (chunk) => {
        try {
          data.push(chunk);
        } catch {
          serverErrorHandler(req, res);
        }
      })
      .on('end', () => {
        try {
          if (data.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let recievedData: any;

            try {
              recievedData = JSON.parse(Buffer.concat(data).toString());
            } catch {
              invalidDataErrorHandler(res, false);

              return;
            }

            if (isNewUser(recievedData)) {
              const newUser = { id: generateUUID(), ...recievedData };
              users.push(newUser);

              res.writeHead(STATUSE_CODE.CREATED, CONTENT_TYPE.JSON);

              res.end(JSON.stringify(newUser));

              if (process.send && cluster.worker) {
                cluster.worker.send(users);
              }
            } else {
              invalidDataErrorHandler(res, false);
            }
          } else {
            invalidDataErrorHandler(res, true);
          }
        } catch {
          serverErrorHandler(req, res);
        }
      });
  } else {
    invalidRequestUrlErrorHandler(req, res);
  }
}
