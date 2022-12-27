import { generateUUID } from '../utils/uuid.js';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export function isNewUser(arg: any): arg is Omit<User, 'id'> {
  return (
    arg &&
    Object.keys(arg).length === 3 &&
    typeof arg.username === 'string' &&
    typeof arg.age === 'number' &&
    Array.isArray(arg.hobbies) &&
    (arg.hobbies.every((hobby: any) => typeof hobby === 'string') || arg.hobbies.length === 0)
  );
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
