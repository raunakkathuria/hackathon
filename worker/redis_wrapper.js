const Redis = require('ioredis')

const redis = new Redis()

async function get_result() {
    try {
        await redis.set("foo", "bar")
        let result = await redis.get("foo");
    }
    console.log("Result: " + result)
    redis.disconnect()
}

async function get_stream() {
    await redis.xadd("mystream", "*", "randomValue", Math.random())
}

get_result()