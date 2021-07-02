const api = require('./apiWrapper');

const Redis = require('ioredis');


class Worker {
    constructor(redis_url = '', group_name = 'worker') {
        this.redis = new Redis(redis_url);
        this.stream_name = 'deriv::hackathon::service';
        this.api = new api.ApiWrapper();
        this.group = group_name;
    }

    async init() {
        try {
            await this.redis.xgroup('CREATE', this.stream_name, this.group, '$', 'MKSTREAM');
        } catch (err) {
            console.log(err.code);
            if (err.code === "BUSYGROUP")
                return;

            return;
            throw err;
        }
    }

    async run() {
        await this.init()
        while (true) {
            const item = await this.get_item();

            await this.process_item(item.data);
            this.ack_item(item.msg_id);
        }
    }

    async get_item() {
        try {
            const [
                [stream_name, msgs]
            ] = await this.redis.xreadgroup('GROUP', this.group, 'consumer', 'COUNT', 1, 'BLOCK', 1000000, 'NOACK', "STREAMS", this.stream_name, '>');
            const [
                [msg_id, response]
            ] = msgs;

            console.log(msg_id)

            let data = {};
            for (let i = 0; i < response.length; i += 2) {
                data[response[i]] = response[i + 1]
            }
            return { msg_id, data };
        } catch (err) {
            console.error(err);

        }
    }

    async ack_item(msg_id) {
        try {
            this.redis.xack(this.stream_name, this.group, msg_id);
        } catch (err) {
            console.error(err);
        }
    }

    async process_item(data) {
        let id = await this.api.createResource(data);
        console.log(`Id: ${id}`);
        data["external_id"] = id;

        try {
            await this.redis.hset('dataset', data.id, JSON.stringify(data));
        } catch (err) {
            console.error(err);
        }

    }


}

const REDIS_URL = process.env.REDIS_URL;
const STREAM_NAME = process.env.SERVICE_NAMESPACE;

let worker = new Worker(REDIS_URL, STREAM_NAME);
worker.run();

exports.module = Worker;