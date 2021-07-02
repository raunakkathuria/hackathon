//redis-helper.js
const redis          = require('ioredis');
const client         = new redis(process.env.REDIS_URL);
const STREAMS_KEY    = process.env.SERVICE_NAMESPACE;
const APPLICATION_ID = "iot_application:node_1";

client.monitor((err, monitor) => {
    monitor.on("monitor", (time, args, source, database) => {
        console.log("Entering monitoring mode.");
    });
});

async function push(request) {
    // push on redis
    var id = await client.xadd(STREAMS_KEY, "*", "request", request);
    return id;
}

module.exports = {
    push,
};
