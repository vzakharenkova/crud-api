import http from 'http';

import { users } from '../data/users.js';
import {
  invalidDataErrorHandler,
  invalidRequestUrlErrorHandler,
  invalidUserIdErrorHandler,
  notFoundErrorHandler,
} from '../utils/errors.js';
import { findUserIndex, isUserProps } from '../utils/user.js';
import { checkIfValidUUID } from '../utils/uuid.js';

export function put(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (!(req.url?.startsWith('/api/users/') && req.url.split('/').length === 4)) {
    invalidRequestUrlErrorHandler(req, res);

    return;
  }

  const id = req.url?.split('/')[3];

  if (!checkIfValidUUID(<string>id)) {
    invalidUserIdErrorHandler(res, id);

    return;
  }

  const selectedUserIndex = findUserIndex(id);

  if (!selectedUserIndex) {
    notFoundErrorHandler(res, id);

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

        if (isUserProps(recievedData)) {
          users[selectedUserIndex] = { ...users[selectedUserIndex], ...recievedData };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(users[selectedUserIndex]));
        } else {
          invalidDataErrorHandler(res, false);
        }
      } else {
        invalidDataErrorHandler(res, true);
      }
    });
}
