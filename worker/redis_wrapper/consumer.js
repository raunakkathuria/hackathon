const Redis = require("ioredis")
const redis = new Redis()

const processMessage = (message) => {
    console.log("Id: %s. Data: %O", message[0], message[1])
};

async function listenForMessage(lastId = "$") {
    const results = await redis.xread("block", 0, "STREAMS", "mystream", lastId);
    const [key, messages] = results[0]; // `key` equals to "mystream"

    messages.forEach(processMessage);

    await listenForMessage(messages[messages.length - 1][0]);
}

listenForMessage();