import http from 'http';
// import url from 'url';

import { checkIfValidUUID } from '../utils/uuid.js';
import { users } from './users.js';

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
      const id = req.url?.split('/')[3];

      if (!checkIfValidUUID(<string>id)) {
        res.writeHead(400, `ID ${id} IS NOT VALID!`, { 'Content-Type': 'text/plain' });
        res.end(res.statusMessage);

        break;
      }

      const user = users.find((user) => user.id === id);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, `USER WITH ID ${id} IS NOT FOUND!`, { 'Content-Type': 'text/plain' });
        res.end(res.statusMessage);
      }

      break;
    }

    default: {
      res.writeHead(500, `CANNOT GET ${req.url}`, { 'Content-Type': 'text/plain' });
      res.end(res.statusMessage);
    }
  }
}
