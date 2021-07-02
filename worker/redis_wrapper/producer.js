const Redis = require("ioredis")
const redis = new Redis()

setInterval(async() => {
    console.log("Streaming on redis")
    await redis.xadd("mystream", "*", "randomValue", Math.random())
}, 3000)