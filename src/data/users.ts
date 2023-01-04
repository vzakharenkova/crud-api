import { generateUUID } from '../utils/uuid.js';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const users: User[] = [];
