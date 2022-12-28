import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { isUser } from '../utils/user';

const baseUrl = 'http://localhost:3000';
const newUser: Omit<User, 'id'> = {
  username: 'Luck',
  age: 18,
  hobbies: ['dancing'],
};

describe('get user by id', () => {
  test('GET request to /api/users/${userId} returns a selected user', async () => {
    const response_1 = await supertest(baseUrl).post('/api/users').send(newUser);

    const response_2 = await supertest(baseUrl).get(`/api/users/${response_1.body.id}`);

    expect(isUser(response_2.body)).toBeTruthy();
    expect(response_2.body.id === response_1.body.id).toBeTruthy();
    expect(response_2.statusCode).toBe(200);
  });

  test('GET request to /api/users/${deletedUserId} returns 404 error', async () => {
    const response_1 = await supertest(baseUrl).post('/api/users').send(newUser);
    const response_2 = await supertest(baseUrl).get(`/api/users/${response_1.body.id}`);

    expect(response_2.statusCode).toBe(200);

    await supertest(baseUrl).delete(`/api/users/${response_2.body.id}`);

    const response_3 = await supertest(baseUrl).get(`/api/users/${response_2.body.id}`);

    expect(response_3.statusCode).toBe(404);
  });
});
