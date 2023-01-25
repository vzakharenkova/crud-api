/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, users } from '../data/users.js';
import { checkIfValidUUID } from './uuid.js';

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

export function isUser(arg: any): arg is User {
  return (
    arg &&
    Object.keys(arg).length === 4 &&
    checkIfValidUUID(arg.id) &&
    typeof arg.username === 'string' &&
    typeof arg.age === 'number' &&
    Array.isArray(arg.hobbies) &&
    (arg.hobbies.every((hobby: any) => typeof hobby === 'string') || arg.hobbies.length === 0)
  );
}

export function isUserProps(arg: { [key: string]: any }): boolean {
  const keys = Object.keys(arg);

  return (
    arg &&
    Object.keys(arg).length <= 3 &&
    keys.every(
      (key) =>
        (key === 'username' && typeof arg[key] === 'string') ||
        (key === 'age' && typeof arg[key] === 'number') ||
        (key === 'hobbies' &&
          Array.isArray(arg.hobbies) &&
          (arg.hobbies.every((hobby: any) => typeof hobby === 'string') ||
            arg.hobbies.length === 0)),
    )
  );
}

export function findUserIndex(userId: string) {
  let index: number | undefined;
  users.find((user, i) => {
    if (user.id === userId) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
}

export function updateUsers(currentData: User[], newData: User[]) {
  currentData.length = 0;
  newData.forEach((user) => currentData.push(user));
}
