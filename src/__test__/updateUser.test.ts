import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { isUser } from '../utils/user';

const baseUrl = 'http://localhost:3000';
const newUser: Omit<User, 'id'> = {
  username: 'Jane',
  age: 56,
  hobbies: [],
};

const updatedProps: Pick<User, 'hobbies'> = { hobbies: ['cooking'] };

describe('update selected user', () => {
  test('PUT request to /api/users/${userId} returns an updated user user', async () => {
    const response_1 = await supertest(baseUrl).post('/api/users').send(newUser);

    const response_2 = await supertest(baseUrl)
      .put(`/api/users/${response_1.body.id}`)
      .send(updatedProps);

    expect(isUser(response_2.body)).toBeTruthy();
    expect(response_2.body.id === response_1.body.id).toBeTruthy();
    expect(response_2.body.hobbies.includes('cooking')).toBeTruthy();
    expect(response_2.statusCode).toBe(200);
  });
});
