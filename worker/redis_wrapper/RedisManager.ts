import * as Redis from 'ioredis';

export default class RedisManager {
    private redis: Redis.Redis;

    constructor(redisUrl: string = '') {
        this.redis = new Redis(redisUrl);
    }

    getRedis() {
        return this.redis;
    }

    async setKey(key: string, value: string) {
        return this.redis.set(key, value);
    }

    async getKey(key: string) {
        return this.redis.del(key);
    }

    async disconnect() {
        this.redis.disconnect();
    }
}
