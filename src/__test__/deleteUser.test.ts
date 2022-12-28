import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';

const baseUrl = 'http://localhost:3000';
const newUser: Omit<User, 'id'> = {
  username: 'Mike',
  age: 99,
  hobbies: ['sleep'],
};

describe('delete selected user', () => {
  test('DELETE request to /api/users/${userId} delete selected user', async () => {
    const response_1 = await supertest(baseUrl).post('/api/users').send(newUser);

    expect(response_1.statusCode).toBe(201);

    await supertest(baseUrl).delete(`/api/users/${response_1.body.id}`);

    const response_2 = await supertest(baseUrl).get(`/api/users/${response_1.body.id}`);

    expect(response_2.statusCode).toBe(404);
  });
});
