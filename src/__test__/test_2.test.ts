import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';

import { User } from '../data/users';
import { generateUUID } from '../utils/uuid';

const baseUrl = `http://localhost:${process.env.PORT || 4000}`;

const notExistingId = generateUUID();

const invalidId = 'invalid id';

const updatedProps: Pick<User, 'hobbies'> = { hobbies: ['cooking'] };

describe('invalid id and not found errors handling', () => {
  test('GET request to /api/users/${notExistingId} returns 404 error', async () => {
    const response = await supertest(baseUrl).get(`/api/users/${notExistingId}`);

    expect(response.statusCode).toBe(404);
  });

  test('GET request to /api/users/${invalidId} returns 400 error', async () => {
    const response = await supertest(baseUrl).get(`/api/users/${invalidId}`);

    expect(response.statusCode).toBe(400);
  });

  test('PUT request to /api/users/${notExistingId} returns 404 error', async () => {
    const response = await supertest(baseUrl).put(`/api/users/${notExistingId}`).send(updatedProps);

    expect(response.statusCode).toBe(404);
  });

  test('PUT request to /api/users/${invalidId} returns 400 error', async () => {
    const response = await supertest(baseUrl).put(`/api/users/${invalidId}`).send(updatedProps);

    expect(response.statusCode).toBe(400);
  });

  test('DELETE request to /api/users/${notExistingId} returns 404 error', async () => {
    const response = await supertest(baseUrl).delete(`/api/users/${notExistingId}`);

    expect(response.statusCode).toBe(404);
  });

  test('DELETE request to /api/users/${invalidId} returns 400 error', async () => {
    const response = await supertest(baseUrl).delete(`/api/users/${invalidId}`);

    expect(response.statusCode).toBe(400);
  });
});
