var api = require('./apiWrapper');

const redis = require("redis");
const { promisify } = require("util");

class Worker {
    constructor(redis_url, stream_name) {
      this.redis = redis.createClient();
      this.stream_name = stream_name;
      this.api = new api_wrapper.ApiWrapper();
    }
    async init () {
        let afunc = promisify(this.redis.xgroup).bind(this.redis);
        await afunc('CREATE', 'test', 'worker', '$', 'MKSTREAM');
    }
    async run(){
        //init connection
        await this.init()
        while (true) {
//             // read item
//             //process item
//             //ack message
                let id = await process_data({
                    title: 'foo2',
                    body: 'bar2',
                    userId: 1000,
                  });
                  console.log(id)
        } 
    } 

    get_item() {
        //xread group
    }

    ack_item(msg_id) {
        //msg ack
    } 
    
    async process_data(data) {
        return await this.api.createResource();
    }


}

const REDIS_URL = process.env.REDIS_URL;
const STREAM_NAME = process.env.SERVICE_NAMESPACE;

let worker = new Worker(REDIS_URL, STREAM_NAME);
worker.run();
