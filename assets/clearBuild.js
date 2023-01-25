import fsPromises from 'fs/promises';
import path from 'path';

const removeDirectory = async (dirPath) => {
  try {
    await fsPromises.rm(dirPath, { recursive: true });
  } catch {}
};

const dir = path.resolve('build');
removeDirectory(dir);
