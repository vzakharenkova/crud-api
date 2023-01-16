# CRUD API with Node.js

## Description

Simple CRUD API using in-memory database underneath for [RSSchool Node.js course 4Q2022](https://rs.school/nodejs/) according to [the task assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md).

## Getting started
- Install 18 LTS version of [Node.js](https://nodejs.org/en/)
- Clone the repository
```
    $ git clone https://github.com/vzakharenkova/crud-api.git
```
- Install dependencies
```
cd CRUD-API
npm install
```
- Rename `.env_copy` file to `.env` to use environment variables.
- Run the project in:
  - development mode
  ```
  npm run start:dev
  ```
    - production mode
  ```
  npm run start:prod
  ```
    - multi mode (horizontal scaling for application)
  ```
  npm run start:multi
  ```
- Navigate to `http://localhost:5000`

## Endpoints
- `/api` - available only in multi mode to test scalling of the app. Accept `GET` (return the last user in the database), `POST` (create new user) and `DELETE` (delete the last user in the database) methods. 
- `/api/users` - accept `GET` (return an array of users) and `POST` (create new user) methods.
- `/api/users/${userId}` - accept `GET` (return a selected user), `PUT` (update a selected user) and `DELETE` (delete a selected user) methods.

## Stored data
- Data is stored as array of objects (users) that have following properties:
  - `id` — unique identifier (string, uuid) generated on server side
  - `username` — user's name **(string, required)**
  - `age` — user's age **(number, required)**
  - `hobbies` — user's hobbies **(array of strings or empty array, required)**
- To create a new user you should pass the body (object) with `username`, `age` **and** `hobbies` according the type of data mentioned above.
- To update an existing user pass the body (object) with `username` **or (and)** `age` **or (and)** `hobbies` according the type of data mentioned above.

## Testing
- Run tests (**note**: the app must be already run)
   ```
  npm run test
  ```
- [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest) are used for testing
