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
  if (req.url !== '/api/users') {
    invalidRequestUrlErrorHandler(req, res);

    return;
  }

  const data: Buffer[] = [];

  req
    .on('data', (chunk) => {
      data.push(chunk);
    })
    .on('end', () => {
      if (data.length) {
        const recievedData: any = JSON.parse(Buffer.concat(data).toString());

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
}
