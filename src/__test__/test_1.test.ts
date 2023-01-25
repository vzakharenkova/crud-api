import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { URL_PARAM } from '../utils/shared';
import { isUser } from '../utils/user';

import * as dotenv from 'dotenv';

dotenv.config();

const baseUrl = `http://localhost:${process.env.PORT || URL_PARAM.PORT}`;

const newUser: Omit<User, 'id'> = {
  username: 'Nick',
  age: 27,
  hobbies: ['cycling'],
};

let userId: string;

const updatedProps: Pick<User, 'hobbies'> = { hobbies: ['cooking'] };

describe('basic valid requests', () => {
  test('GET request to /api/users returns an empty array', async () => {
    const response = await supertest(baseUrl).get('/api/users');

    expect(response.body).toHaveLength(0);
    expect(response.statusCode).toBe(200);
  });

  test('POST request to /api/users returns a new user', async () => {
    const response = await supertest(baseUrl).post('/api/users').send(newUser);
    userId = response.body.id;

    expect(isUser(response.body)).toBeTruthy();
    expect(response.statusCode).toBe(201);
  });

  test('PUT request to /api/users/${userId} returns an updated user user', async () => {
    const response = await supertest(baseUrl).put(`/api/users/${userId}`).send(updatedProps);

    expect(isUser(response.body)).toBeTruthy();
    expect(response.body.id === userId).toBeTruthy();
    expect(response.body.hobbies.includes('cooking')).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });

  test('DELETE request to /api/users/${userId} delete selected user', async () => {
    const response = await supertest(baseUrl).delete(`/api/users/${userId}`);

    expect(response.statusCode).toBe(204);
  });

  test('GET request to /api/users/${deletedUserId} returns 404 error', async () => {
    const response = await supertest(baseUrl).get(`/api/users/${userId}`);

    expect(response.statusCode).toBe(404);
  });
});
