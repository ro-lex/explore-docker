const express = require('express');

const redis = require('redis');

const process = require('process');

const app = express();

const redisClient = redis.createClient({
        host: 'redis-server',
        port: 6379
    });

redisClient.get('count', (err, initCount) => {
    console.log('Initial Count: ' + initCount);
    if(initCount === null){
        redisClient.set('count', 1);
    }
});

app.get('/', (request, response) => {
    redisClient.get('count', (err, count) => {
        if(parseInt(count) == 1){
            console.log('Count is 1. Exiting');
            redisClient.set('count', parseInt(count) + 1);
            process.exit(0);
        }
        response.send('Visitor count so far ' + count);
        redisClient.set('count', parseInt(count) + 1);
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080.')
});

