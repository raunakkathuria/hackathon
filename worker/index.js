var api_wrapper = require('./apiWrapper');

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
    async run(){
//         //init connection
          var api_wrapper2 = new api_wrapper.ApiWrapper();
        while (true) {
//             // read item
//             //process item
//             //ack message
                let id = await api_wrapper2.createResource({
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

    ack_item() {
        //msg ack
    } 


}

let worker = new Worker('test', 'test');
worker.run();


