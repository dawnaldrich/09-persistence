'use strict';

const logger = require('../lib/logger');
const Frog = require('../model/frog');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeFrog(router) {
  router.post('/api/v1/frog', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-FROG: POST /api/v1/frog');
    try {
      const newFrog = new Frog(req.body.title, req.body.content);
      storage.create('Frog', newFrog)
        .then((frog) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(frog));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-FROG: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });
  router.get('/api/v1/frog', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Frog', req.url.query.id)
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    } else {
      storage.fetchAll('Frog')
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    }
  });
  router.delete('/api/v1/frog', (req, res) => {
    storage.delete('Frog', req.url.query.id)
      .then(() => {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.write('No content in the body');
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};


