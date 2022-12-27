import http from 'http';
import { checkIfValidUUID } from '../utils/uuid.js';
import { users } from './users.js';

export function deleteFn(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (req.url?.startsWith('/api/users/') && req.url.split('/').length === 4) {
    const id = req.url?.split('/')[3];

    if (!checkIfValidUUID(<string>id)) {
      res.writeHead(400, `ID ${id} IS NOT VALID!`, { 'Content-Type': 'text/plain' });
      res.end(res.statusMessage);
    } else {
      let index: number | undefined;
      users.find((user, i) => {
        if (user.id === id) {
          index = i;
          return true;
        }
        return false;
      });

      if (index) {
        users.splice(index, 1);
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.end(`USER WITH ID ${id} is successfully deleted!`);
      } else {
        res.writeHead(404, `USER WITH ID ${id} IS NOT FOUND!`, { 'Content-Type': 'text/plain' });
        res.end(res.statusMessage);
      }
    }
  } else {
    res.writeHead(500, `CANNOT DELETE ${req.url}`, { 'Content-Type': 'text/plain' });
    res.end(res.statusMessage);
  }
}
