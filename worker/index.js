const redis = require("redis");
const { promisify } = require("util");

class Worker {
    constructor(redis_url, stream_name) {
      this.redis = redis.createClient(redis_url);
      this.stream_name = stream_name;
    }
    async init () {
        let afunc = promisify(this.redis.xgroup).bind(this.redis);
        try {
            await afunc('CREATE', this.stream_name, 'worker', '$', 'MKSTREAM');
        } catch  (err) {
            console.log(err)
            throw err;
        }
    }
    async run(){
        //init connection
        await this.init()
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