var api = require('./apiWrapper');

const redis = require("redis");
const { promisify } = require("util");

class Worker {
    constructor(redis_url, stream_name) {
      this.redis = redis.createClient(redis_url);
      this.stream_name = stream_name;
      this.api = new api.ApiWrapper();
      this.group = "worker"
    }
    async init () {
        let afunc = promisify(this.redis.xgroup).bind(this.redis);
        try {
            await afunc('CREATE', this.stream_name, this.group, '$', 'MKSTREAM');
        } catch  (err) {
            if(err.code === "BUSYGROUP") {
                return;
            }

            throw err;
        }
    }
    async run(){
        //init connection
        await this.init()
        while (true) {
//             // read item
//             //process item
//             //ack message
            let obj_data = {
                    title: 'foo2',
                    body: 'bar2',
                    userId: 1000,
                  };
                await this.process_item(obj_data);
                  console.log(id)
        } 
    } 

    get_item() {
        //xread group
        let afunc = promisify(this.redis.xreadgroup).bind(this.redis);
        // let msg = await afunc(
        //     GROUP => CONSUMER_GROUP,
        //     $self->consumer_name,
        //     BLOCK   => $self->queue_wait_time * 1000,    # BLOCK expects milliseconds
        //     COUNT   => 1,
        //     STREAMS => $self->stream_name,
        //     '>'                                          # Redis special ID which retrieve last id of group's messages
        // );
    }

    ack_item(msg_id) {
        //msg ack
    } 
    
    async process_item(data) {
         let id = await this.api.createResource();
    }


}

const REDIS_URL = process.env.REDIS_URL;
const STREAM_NAME = process.env.SERVICE_NAMESPACE;

let worker = new Worker(REDIS_URL, STREAM_NAME);
worker.run();
