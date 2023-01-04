import cluster from 'cluster';
import os from 'os';

import * as dotenv from 'dotenv';

import { createNewServer } from './modules/server.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

if (process.env.NODE_ENV !== 'multi') {
  createNewServer(PORT);
} else {
  const cpus = os.cpus().length;

  if (cluster.isPrimary) {
    console.log(`Forking for ${cpus} CPUs`);

    for (let i = 0; i < cpus; i++) {
      const worker_env = { WORKER_PORT: PORT + i };

      cluster.fork(worker_env);
    }
  } else {
    const port = Number(process.env['WORKER_PORT']);

    createNewServer(port);
  }
}
