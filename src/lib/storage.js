'use strict';

const logger = require('./logger');
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
//const memory = {};

// schema is the type of resource (frog)
storage.create = function create(schema, item) {
  return new Promise((resolve, reject) => {
    if (!schema) return Promise.reject(new Error('Cannot create a new item, schema require'));
    if (!item) return Promise.reject(new Error('Cannot create a new item, item required'));
    // if (!memory[schema]) memory[schema] = {};
    // memory[schema][item.id] = item;
    // logger.log(logger.INFO, 'STORAGE: Created a new resource');
    // return resolve(item);
    const json = JSON.stringify(item);
    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
      .then(() => {
        logger.log(logger.INFO, 'STORAGE: Created a new resource');
        return item;
      })
      .catch(err => Promise.reject(err));
  });
};

storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/...data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });

  storage.update = function update() {


  };

  storage.delete = function del() {

  };
}
//
// storage.fetchOne = function fetchOne(schema, id) {
//   return new Promise((resolve, reject) => {
//     if (!schema) return reject(new Error('expected schema name'));
//     if (!id) return reject(new Error('expected id'));
//    // if (!memory[schema]) return reject(new Error('schema not found'));
//     const item = memory[schema][id];
//
//     if (!item) {
//       return reject(new Error('item not found'));
//     }
//     return resolve(item);
//   });
// };
//
// storage.fetchAll = function fetchAll(schema) {
//   return new Promise((resolve, reject) => {
//     if (!schema) return reject(new Error('expected schema name'));
//     // if (!memory[schema]) return reject(new Error('schema not found'));
//
//     const allItems = Object.values(memory[schema]);
//     const frog = allItems.map(frogs => frogs.id);
//
//     if (!frog) {
//       return reject(new Error('object not found'));
//     }
//     return resolve(frog);
//   });
// };
//
// storage.delete = function del(schema, id) {
//   return new Promise((resolve, reject) => {
//     if (!schema) return reject(new Error('expected schema name'));
//     if (!id) return reject(new Error('expected id'));
//     if (!memory[schema]) return reject(new Error('schema not found'));
//
//     const item = memory[schema][id];
//     delete memory[schema][id];
//
//     return resolve(item);
//   });
//};

