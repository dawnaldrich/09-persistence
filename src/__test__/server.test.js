'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { title: 'test title after persit', content: 'test content after persist' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/frog', () => {
    it('should respond with status 201 and created a new frog', () => {
      return superagent.post(`:${testPort}/api/v1/frog`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/frog', () => {
    it('should respond with the a previously created frog', () => {
      return superagent.get(`:${testPort}/api/v1/frog?id=${mockId}`)
        .then((res) => {
          expect(res.body.title).toEqual(mockResource.title);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
      // if testing for errors, test in a .catch block
    });
  });
});

describe('INVALID request to the API', () => {
  describe('GET /api/v1/frog', () => {
    it('should err out with 404 status code for not sending id', () => {
      return superagent.get(`:${testPort}/api/v1/frog`)
        .query({})
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
    it('should respond with not found if id was not found', () => {
      return superagent.get(`:${testPort}/api/v1/frog?id=5`)
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
    it('it should respond with bad request if no id was provided', () => {
      return superagent.get(`:${testPort}/api/v1/frog?id=${mockId}`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
    it('it should respond with bad request if no body was provided', () => {
      return superagent.get(`:${testPort}/api/v1/frog?id=${mockId}`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
});
