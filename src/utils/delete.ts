import cluster from 'cluster';
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

export function deleteFn(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (process.env.NODE_ENV === 'multi' && req.url === '/api') {
    if (users.length) {
      users.pop();

      res.writeHead(STATUSE_CODE.NO_CONTENT, CONTENT_TYPE.TEXT);

      res.end('USER IS SUCCESSFULLY DELETED!');

      if (process.send && cluster.worker) {
        cluster.worker.send(users);
      }
    } else {
      res.writeHead(STATUSE_CODE.NOT_FOUND, CONTENT_TYPE.TEXT);

      res.end('THERE ARE NO USERS!');
    }

    return;
  }

  if (!(req.url?.startsWith('/api/users/') && req.url.split('/').length === 4)) {
    invalidRequestUrlErrorHandler(req, res);

    return;
  }

  const id = <string>req.url?.split('/')[3];

  if (!checkIfValidUUID(<string>id)) {
    invalidUserIdErrorHandler(res, id);

    return;
  }

  const userIndex = findUserIndex(id);

  if (userIndex !== undefined) {
    users.splice(userIndex, 1);

    res.writeHead(STATUSE_CODE.NO_CONTENT, CONTENT_TYPE.TEXT);

    res.end(`USER WITH ID ${id} IS SUCCESSFULLY DELETED!`);

    if (process.send && cluster.worker) {
      cluster.worker.send(users);
    }
  } else {
    notFoundErrorHandler(res, id);
  }
}
