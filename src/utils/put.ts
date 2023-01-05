import cluster from 'cluster';
import http from 'http';

import { users } from '../data/users.js';
import {
  invalidDataErrorHandler,
  invalidRequestUrlErrorHandler,
  invalidUserIdErrorHandler,
  notFoundErrorHandler,
} from './errors.js';
import { findUserIndex, isUserProps } from './user.js';
import { checkIfValidUUID } from './uuid.js';

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

  if (selectedUserIndex === undefined) {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let recievedData: any;

        try {
          recievedData = JSON.parse(Buffer.concat(data).toString());
        } catch {
          invalidDataErrorHandler(res, false);

          return;
        }

        if (isUserProps(recievedData)) {
          users[selectedUserIndex] = { ...users[selectedUserIndex], ...recievedData };

          res.writeHead(200, { 'Content-Type': 'application/json' });

          res.end(JSON.stringify(users[selectedUserIndex]));

          if (process.send && cluster.worker) {
            cluster.worker.send(users);
          }
        } else {
          invalidDataErrorHandler(res, false);
        }
      } else {
        invalidDataErrorHandler(res, true);
      }
    });
}
