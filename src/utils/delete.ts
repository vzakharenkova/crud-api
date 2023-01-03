import http from 'http';

import { users } from '../data/users.js';
import {
  invalidRequestUrlErrorHandler,
  invalidUserIdErrorHandler,
  notFoundErrorHandler,
} from './errors.js';
import { findUserIndex } from './user.js';
import { checkIfValidUUID } from './uuid.js';

export function deleteFn(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (!(req.url?.startsWith('/api/users/') && req.url.split('/').length === 4)) {
    invalidRequestUrlErrorHandler(req, res);
  }

  const id = <string>req.url?.split('/')[3];

  if (!checkIfValidUUID(<string>id)) {
    invalidUserIdErrorHandler(res, id);

    return;
  }

  const userIndex = findUserIndex(id);

  if (userIndex) {
    users.splice(userIndex, 1);
    res.writeHead(204, { 'Content-Type': 'text/plain' });
    res.end(`USER WITH ID ${id} is successfully deleted!`);
  } else {
    notFoundErrorHandler(res, id);
  }
}
