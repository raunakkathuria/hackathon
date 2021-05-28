//redis-helper.js
const redis          = require('redis');
const { promisify }  = require("util");
const client         = redis.createClient(process.env.REDIS_URL);
const STREAMS_KEY    = process.env.SERVICE_NAMESPACE;
const APPLICATION_ID = "iot_application:node_1";


client.monitor(function(err, res) {
    console.log("Entering monitoring mode.");
});

// create the group
let afunc = promisify(client.xgroup).bind(client);
afunc ("CREATE", STREAMS_KEY, APPLICATION_ID, '$', 'MKSTREAM' , function(err) {
    if (err) {
        if (err.code === 'BUSYGROUP' ) {
            console.log(`Group ${APPLICATION_ID} already exists`);
        } else {
            console.log(err);
            process.exit();
        }
    }
});

afunc push(request) {
    // push on redis
    client.xadd(STREAMS_KEY, "*", request);
    return 1;
}

module.exports = {
    push,
};
