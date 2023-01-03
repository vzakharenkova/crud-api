import http from 'http';

import { deleteFn } from '../utils/delete.js';
import { get } from '../utils/get.js';
import { post } from '../utils/post.js';
import { put } from '../utils/put.js';

export class ServerService {
  req: http.IncomingMessage;

  res: http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
  };

  constructor(
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
      req: http.IncomingMessage;
    },
  ) {
    this.req = req;
    this.res = res;
  }

  get() {
    get(this.req, this.res);
  }

  post() {
    post(this.req, this.res);
  }

  put() {
    put(this.req, this.res);
  }

  delete() {
    deleteFn(this.req, this.res);
  }
}
