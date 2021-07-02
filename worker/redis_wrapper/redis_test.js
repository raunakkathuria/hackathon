"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedisManager_1 = require("./RedisManager");
async function test_redis() {
    const redis = new RedisManager_1.default();
    const set_res = await redis.setKey('name', 'Arash');
    console.log(`Set result: ${set_res}`);
    const name = await redis.getKey('name');
    console.log(`Name: ${name}`);
    redis.disconnect();
}
test_redis();
//# sourceMappingURL=redis_test.js.map