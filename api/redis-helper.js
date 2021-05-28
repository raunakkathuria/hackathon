//redis-helper.js
const redis          = require('redis');
const { promisify }  = require("util");
const client         = redis.createClient(process.env.REDIS_URL);
const STREAMS_KEY    = process.env.SERVICE_NAMESPACE;
const APPLICATION_ID = "iot_application:node_1";


client.monitor(function(err, res) {
    console.log("Entering monitoring mode.");
});

async function push(request) {
    // push on redis
    const xadd = promisify(client.xadd).bind(client);
    var id = await xadd (STREAMS_KEY, "*", 'request', request, function(err) {
    if (err) {
            console.log(err);
            process.exit();
        }
    });
    return id;
}

module.exports = {
    push,
};
