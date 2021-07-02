"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
class RedisManager {
    constructor(redisUrl = '') {
        this.redis = new Redis(redisUrl);
    }
    getRedis() {
        return this.redis;
    }
    async setKey(key, value) {
        return this.redis.set(key, value);
    }
    async getKey(key) {
        return this.redis.del(key);
    }
    async disconnect() {
        this.redis.disconnect();
    }
}
exports.default = RedisManager;
//# sourceMappingURL=RedisManager.js.map