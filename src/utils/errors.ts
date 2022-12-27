import http from 'http';

export function invalidDataErrorHandler(
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  isEmptyBody: boolean,
) {
  let msg: string;

  if (isEmptyBody) {
    msg = 'DATA IS NOT PASSED!';
  } else {
    msg = 'PASSED DATA IS NOT VALID!';
  }

  res.writeHead(400, msg, { 'Content-Type': 'text/plain' });
  res.end(res.statusMessage);
}

export function notFoundErrorHandler(
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  userId: string,
) {
  res.writeHead(404, `USER WITH ID ${userId} IS NOT FOUND!`, { 'Content-Type': 'text/plain' });
  res.end(res.statusMessage);
}

export function invalidUserIdErrorHandler(
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  id: string,
) {
  res.writeHead(400, `ID ${id} IS NOT VALID!`, { 'Content-Type': 'text/plain' });
  res.end(res.statusMessage);
}

export function invalidRequestUrlErrorHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  res.writeHead(500, `CANNOT ${req.method} ${req.url}`, { 'Content-Type': 'text/plain' });
  res.end(res.statusMessage);
}
