import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { isUser } from '../utils/user';

const baseUrl = 'http://localhost:3000';
const newUser: Omit<User, 'id'> = {
  username: 'Nick',
  age: 27,
  hobbies: ['cycling'],
};

describe('create new user', () => {
  test('POST request to /api/users returns a new user', async () => {
    const response = await supertest(baseUrl).post('/api/users').send(newUser);

    expect(isUser(response.body)).toBeTruthy();
    expect(response.statusCode).toBe(201);
  });
});
