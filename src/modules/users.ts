import { generateUUID } from '../utils/uuid.js';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const users: User[] = [
  {
    id: 's7fniscoso',
    username: 'Vika',
    age: 23,
    hobbies: ['programming'],
  },
  {
    id: generateUUID(),
    username: 'Tom',
    age: 30,
    hobbies: ['swimming'],
  },
];
