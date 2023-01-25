import http from 'http';

import { CONTENT_TYPE, STATUSE_CODE } from './shared.js';

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

  res.writeHead(STATUSE_CODE.BAD_REQUEST, msg, CONTENT_TYPE.TEXT);
  res.end(res.statusMessage);
}

export function notFoundErrorHandler(
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  userId: string,
) {
  res.writeHead(STATUSE_CODE.NOT_FOUND, `USER WITH ID ${userId} IS NOT FOUND!`, CONTENT_TYPE.TEXT);
  res.end(res.statusMessage);
}

export function invalidUserIdErrorHandler(
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
  id: string,
) {
  res.writeHead(STATUSE_CODE.BAD_REQUEST, `ID ${id} IS NOT VALID!`, CONTENT_TYPE.TEXT);
  res.end(res.statusMessage);
}

export function invalidRequestUrlErrorHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  res.writeHead(STATUSE_CODE.NOT_FOUND, `CANNOT ${req.method} ${req.url}`, CONTENT_TYPE.TEXT);
  res.end(res.statusMessage);
}

export function serverErrorHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  },
) {
  res.writeHead(STATUSE_CODE.INTERNAL_SERVER_ERROR, 'Internal Server Error', CONTENT_TYPE.TEXT);

  res.end(res.statusMessage);
}
