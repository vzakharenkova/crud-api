import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import { User } from '../data/users';
import { URL_PARAM } from '../utils/shared';

const baseUrl = `http://localhost:${process.env.PORT || URL_PARAM.PORT}`;

const invalidEndpoint = '/invalid/endpoint';

const newUser: Omit<User, 'id'> = {
  username: 'Nick',
  age: 27,
  hobbies: ['cycling'],
};

const updatedProps: Pick<User, 'hobbies'> = { hobbies: ['cooking'] };

describe('requests to not existing endpoints', () => {
  test('GET request to invalid endpoint returns 404 error and message which includes "CANNOT"', async () => {
    const response = await supertest(baseUrl).get(invalidEndpoint);

    expect(response.error).toBeTruthy();

    if (response.error) {
      expect(response.error.text.includes('CANNOT')).toBeTruthy();
    }

    expect(response.statusCode).toBe(404);
  });

  test('POST request to invalid endpoint returns 404 error and message which includes "CANNOT"', async () => {
    const response = await supertest(baseUrl).post(invalidEndpoint).send(newUser);

    expect(response.error).toBeTruthy();

    if (response.error) {
      expect(response.error.text.includes('CANNOT')).toBeTruthy();
    }

    expect(response.statusCode).toBe(404);
  });

  test('PUT request to invalid endpoint returns 404 error and message which includes "CANNOT"', async () => {
    const response = await supertest(baseUrl).put(invalidEndpoint).send(updatedProps);

    expect(response.error).toBeTruthy();

    if (response.error) {
      expect(response.error.text.includes('CANNOT')).toBeTruthy();
    }

    expect(response.statusCode).toBe(404);
  });

  test('DELETE request to invalid endpoint returns 404 error and message which includes "CANNOT"', async () => {
    const response = await supertest(baseUrl).delete(invalidEndpoint);

    expect(response.error).toBeTruthy();

    if (response.error) {
      expect(response.error.text.includes('CANNOT')).toBeTruthy();
    }

    expect(response.statusCode).toBe(404);
  });
});
