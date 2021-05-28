//redis-helper.js
const redis = require('redis');
const {promisify} = require('util');
const client = redis.createClient(process.env.REDIS_URL);
const STREAMS_KEY = process.env.S ;
const APPLICATION_ID = "iot_application:node_1";
var CONSUMER_ID = "WORKER";

client.monitor(function(err, res) {
    console.log("Entering monitoring mode.");
});

// create the group
client.xgroup("CREATE", STREAMS_KEY, APPLICATION_ID, '$', 'MKSTREAM' , function(err) {
    if (err) {
        if (err.code == 'BUSYGROUP' ) {
            console.log(`Group ${APPLICATION_ID} already exists`);
        } else {
            console.log(err);
            process.exit();
        }
    }
});


function push(request) {
    // push on redis
    return 1;
}

module.exports = {
    push,
};
