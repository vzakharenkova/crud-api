import { generateUUID } from '../utils/uuid.js';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export const users: User[] = [
  {
    id: generateUUID(),
    username: 'Tom',
    age: 30,
    hobbies: ['swimming'],
  },
];
