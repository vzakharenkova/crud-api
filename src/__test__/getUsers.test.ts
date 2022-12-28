import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { isUser } from '../utils/user';

const baseUrl = 'http://localhost:3000';

describe('get all users', () => {
  test('GET request to /api/users returns an array of users', async () => {
    const response = await supertest(baseUrl).get('/api/users');

    expect(
      response.body.length === 0 || response.body.every((user: any) => isUser(user)),
    ).toBeTruthy();
    expect(response.statusCode).toBe(200);
  });
});
