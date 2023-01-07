import cluster from 'cluster';
import os from 'os';

import * as dotenv from 'dotenv';

import { createNewServer } from './modules/server.js';
import { User, users } from './data/users.js';
import { updateUsers } from './utils/user.js';
import { URL_PARAM } from './utils/shared.js';

dotenv.config();

const PORT = Number(process.env.PORT) || URL_PARAM.PORT;

if (process.env.NODE_ENV !== 'multi') {
  createNewServer(PORT);
} else {
  const cpus = os.cpus().length;

  if (cluster.isPrimary) {
    console.log(`Forking for ${cpus} CPUs`);

    for (let i = 1; i <= cpus; i++) {
      const worker_env = { WORKER_PORT: PORT + i };

      cluster.fork(worker_env).on('message', (updatedData: User[]) => {
        updateUsers(users, updatedData);
      });
    }

    createNewServer(PORT);
  } else {
    process.on('message', (updatedData: User[]) => {
      updateUsers(users, updatedData);
    });

    const port = Number(process.env['WORKER_PORT']);

    createNewServer(port);
  }
}

process.on('SIGINT', function () {
  console.log('Goodbye!');
});

// process.on('SIGTERM', function () {
//   console.log('Receiving SIGINT signal in nodeJS.');
//   process.exit(0);
// });
