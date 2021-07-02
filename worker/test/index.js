const assert = require('assert');
const Worker = require('../index.js');


describe('Worker', () => {
    describe('create an instance', () => {
        const REDIS_URL = process.env.REDIS_URL;
        const STREAM_NAME = process.env.SERVICE_NAMESPACE;
        it('should not throw errors', () => {
            assert.ok(1);
        });
    });
});