import RedisManager from './RedisManager';

async function test_redis() {
	const redis = new RedisManager()
	const set_res = await redis.setKey('name', 'Arash')
	console.log(`Set result: ${set_res}`)

	const name = await redis.getKey('name')
	console.log(`Name: ${name}`)
	redis.disconnect();
}

test_redis()
