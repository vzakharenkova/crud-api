import http from 'http';
import { checkIfValidUUID } from '../utils/uuid.js';
import { isUserProps, users } from './users.js';

export function put(
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
      const selectedUser = users.find((user) => user.id === id);

      if (selectedUser) {
        const data: Buffer[] = [];

        req.on('data', (chunk) => {
          data.push(chunk);
        });

        req.on('end', () => {
          if (data.length) {
            const recievedData: any = JSON.parse(Buffer.concat(data).toString());

            if (isUserProps(recievedData)) {
              const index = users.indexOf(selectedUser);

              users[index] = { ...selectedUser, ...recievedData };

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(users[index]));
            } else {
              res.writeHead(400, 'PASSED DATA IS NOT VALID!', { 'Content-Type': 'text/plain' });
              res.end(res.statusMessage);
            }
          } else {
            res.writeHead(400, 'DATA IS NOT PASSED!', { 'Content-Type': 'text/plain' });
            res.end(res.statusMessage);
          }
        });
      } else {
        res.writeHead(404, `USER WITH ID ${id} IS NOT FOUND!`, { 'Content-Type': 'text/plain' });
        res.end(res.statusMessage);
      }
    }
  } else {
    res.writeHead(500, `CANNOT PUT ${req.url}`, { 'Content-Type': 'text/plain' });
    res.end(res.statusMessage);
  }
}
