import http from 'http';

import { users } from '../data/users.js';
import { invalidDataErrorHandler, invalidRequestUrlErrorHandler } from './errors.js';
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
        data.push(chunk);
      })
      .on('end', () => {
        if (data.length) {
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

            res.writeHead(201, { 'Content-Type': 'application/json' });

            res.end(JSON.stringify(newUser));
          } else {
            invalidDataErrorHandler(res, false);
          }
        } else {
          invalidDataErrorHandler(res, true);
        }
      });
  } else {
    invalidRequestUrlErrorHandler(req, res);
  }
}
