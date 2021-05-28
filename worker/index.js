const redis = require("redis");

class Worker {
    constructor(redis_url) {
      this.redis_url = redis_url;
    }
    init () {
        
        // create consumer group
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

    ack_item() {
        //msg ack
    } 


}

let worker = new Worker('test', 'test');
worker.run();