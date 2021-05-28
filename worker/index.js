const redis = require("redis");

class Worker {
    constructor(redis_url, stream_name) {
      this.redis_url = redis_url;
      this.stream_name = stream_name;
    }
    init () {
        this.redis = redis.createClient(this.redis_url);
        // create consumer group
        this.redis.xgroup('CREATE', this.stream_name, 'worker', '$', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
    run(){
        //init connection
        while (true) {
            // read item
            //process item
            //ack message
        } 
    } 

    get_item() {
        //xread group
    }

    ack_item(msg_id) {
        //msg ack
    } 


}

const REDIS_URL = process.env.REDIS_URL;
const STREAM_NAME = process.env.SERVICE_NAMESPACE;

let worker = new Worker(REDIS_URL, STREAM_NAME);
worker.run();