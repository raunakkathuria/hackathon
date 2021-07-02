var api = require('./apiWrapper');

const redis = require("redis");
const { promisify } = require("util");

export default class Worker {
    constructor(redis_url, stream_name, group_name = 'worker') {
        this.redis = redis.createClient(redis_url);
        this.stream_name = stream_name;
        this.api = new api.ApiWrapper();
        this.group = group_name;
    }
    async init() {
        let afunc = promisify(this.redis.xgroup).bind(this.redis);
        try {
            await afunc('CREATE', this.stream_name, this.group, '$', 'MKSTREAM');
        } catch (err) {
            if (err.code === "BUSYGROUP") {
                return;
            }

            throw err;
        }
    }
    async run() {
        await this.init()
        while (true) {
            const item = await this.get_item();

            let obj_data = {
                title: 'foo2',
                body: 'bar2',
                userId: 1000,
            };
            await this.process_item(obj_data);
            await this.ack_item(item.msg_id);
        }
    }

    get_item() {
        //xread group
        let afunc = promisify(this.redis.xreadgroup).bind(this.redis);
        // let msg = await afunc(
        //     GROUP => CONSUMER_GROUP,
        //      $self->consumer_name,
        //     BLOCK   => $self->queue_wait_time * 1000,    # BLOCK expects milliseconds
        //     COUNT   => 1,
        //     STREAMS => $self->stream_name,
        //     '>'                                          # Redis special ID which retrieve last id of group's messages
        // );
    }

    async ack_item(msg_id) {
        const afunc = promisify(this.redis.xack).bind(this.redis);
        try {
            await afunc(this.stream_name, this.group, msg_id);
        } catch (err) {
            console.log(err);
        }
    }

    async process_item(data) {
        let id = await this.api.createResource(data);
    }


}

const REDIS_URL = process.env.REDIS_URL;
const STREAM_NAME = process.env.SERVICE_NAMESPACE;

let worker = new Worker(REDIS_URL, STREAM_NAME);
worker.run();
ack_item