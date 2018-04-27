'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class {
  constructor(title, content) {
    if (!title || !content) throw new Error('POST requires title and contet');
    this.title = title;
    this.content = content;
    this.id = uuid();
    logger.log(logger.INFO, `frog: Created a new frog: ${JSON.stringify(this)}`);
  }
};
