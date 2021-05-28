
class Worker {
    constructor(redis_host, redis_port) {
      this.redis_host = redis_host;
      this.redis_port = redis_port;
    }

    run(){
        console.log("test run");
    } 
}

let worker = new Worker('test', 'test');
worker.run();