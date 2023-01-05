import http from 'http';

import { deleteFn } from '../utils/delete.js';
import { get } from '../utils/get.js';
import { post } from '../utils/post.js';
import { put } from '../utils/put.js';

export class ServerService {
  get(
    req: http.IncomingMessage,

    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
  ) {
    get(req, res);
  }

  post(
    req: http.IncomingMessage,

    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
  ) {
    post(req, res);
  }

  put(
    req: http.IncomingMessage,

    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
  ) {
    put(req, res);
  }

  delete(
    req: http.IncomingMessage,

    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
  ) {
    deleteFn(req, res);
  }
}
