import http from 'http';
import { generateUUID } from '../utils/uuid.js';
import { isNewUser, users } from './users.js';

export function post(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  if (req.url === '/api/users') {
    const data: Buffer[] = [];

    req.on('data', (chunk) => {
      data.push(chunk);
    });

    req.on('end', () => {
      if (data.length) {
        const recievedData: any = JSON.parse(Buffer.concat(data).toString());

        if (isNewUser(recievedData)) {
          const newUser = { id: generateUUID(), ...recievedData };
          users.push(newUser);

          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newUser));
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
    res.writeHead(500, `CANNOT POST ${req.url}`, { 'Content-Type': 'text/plain' });
    res.end(res.statusMessage);
  }
}
