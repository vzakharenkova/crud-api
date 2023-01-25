import http from 'http';

import { users } from '../data/users.js';
import {
  invalidRequestUrlErrorHandler,
  invalidUserIdErrorHandler,
  notFoundErrorHandler,
} from './errors.js';
import { CONTENT_TYPE, STATUSE_CODE } from './shared.js';
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
      res.writeHead(STATUSE_CODE.OK, CONTENT_TYPE.JSON);

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

      if (typeof userIndex === 'number') {
        res.writeHead(200, CONTENT_TYPE.JSON);

        res.end(JSON.stringify(users[userIndex]));
      } else {
        notFoundErrorHandler(res, id);
      }

      break;
    }

    case process.env.NODE_ENV === 'multi' && req.url === '/api': {
      if (users.length) {
        res.writeHead(STATUSE_CODE.OK, CONTENT_TYPE.JSON);

        res.end(JSON.stringify(users[users.length - 1]));
      } else {
        res.writeHead(STATUSE_CODE.NOT_FOUND, CONTENT_TYPE.TEXT);

        res.end('THERE ARE NO USERS!');
      }

      break;
    }

    default: {
      invalidRequestUrlErrorHandler(req, res);
    }
  }
}
