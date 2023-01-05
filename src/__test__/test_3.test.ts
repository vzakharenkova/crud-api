import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { URL_PARAM } from '../utils/shared';

const baseUrl = `http://localhost:${process.env.PORT || URL_PARAM.PORT}`;

const newUser: Omit<User, 'id'> = {
  username: 'Nick',
  age: 27,
  hobbies: ['cycling'],
};

const emptyBody = {};

const bodyWithInvalidProps = {
  username: 'Nick',
  age: 27,
  hobbies: ['cycling'],
  jod: 'accountant',
};

const invalidPropToUpdate = { hobbies: 'cooking' };

let userId: string;

describe('send invalid body', () => {
  test('POST request to /api/users with empty body returns 400 error', async () => {
    const response = await supertest(baseUrl).post('/api/users').send(emptyBody);

    expect(response.statusCode).toBe(400);
  });

  test('POST request to /api/users with body with invalid field returns 400 error', async () => {
    const response = await supertest(baseUrl).post('/api/users').send(bodyWithInvalidProps);

    expect(response.statusCode).toBe(400);
  });

  test('PUT request to /api/users/${userId} with body with invalid field returns 400 error', async () => {
    const res = await supertest(baseUrl).post('/api/users').send(newUser);
    userId = res.body.id;

    const response = await supertest(baseUrl).put(`/api/users/${userId}`).send(invalidPropToUpdate);

    expect(response.statusCode).toBe(400);

    await supertest(baseUrl).delete(`/api/users/${userId}`);
  });
});
