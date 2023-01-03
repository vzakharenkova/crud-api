import http from 'http';

import { users } from '../data/users.js';
import {
  invalidRequestUrlErrorHandler,
  invalidUserIdErrorHandler,
  notFoundErrorHandler,
} from './errors.js';
import { findUserIndex } from './user.js';

import { checkIfValidUUID } from './uuid.js';

export function get(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  switch (true) {
    case req.url === '/api/users': {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify(users));

      break;
    }

    case req.url?.startsWith('/api/users/') && req.url.split('/').length === 4: {
      const id = <string>req.url?.split('/')[3];

      if (!checkIfValidUUID(id)) {
        invalidUserIdErrorHandler(res, id);

        break;
      }

      const userIndex = findUserIndex(id);

      if (userIndex) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users[userIndex]));
      } else {
        notFoundErrorHandler(res, id);
      }

      break;
    }

    default: {
      invalidRequestUrlErrorHandler(req, res);
    }
  }
}
