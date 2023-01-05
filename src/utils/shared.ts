export enum STATUSE_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export const CONTENT_TYPE = {
  JSON: { 'Content-Type': 'application/json' },
  TEXT: { 'Content-Type': 'text/plain' },
};

export enum URL_PARAM {
  PORT = 5000,
  HOST = 'localhost',
}
