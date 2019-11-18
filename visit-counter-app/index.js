const express = require('express');

const redis = require('redis');

const app = express();

const redisClient = redis.createClient({
        host: 'redis-server',
        port: 6379
    });

redisClient.set('count', 1);

app.get('/', (request, response) => {
    redisClient.get('count', (err, count) => {
        response.send('Visitor count so far ' + count);
        redisClient.set('count', parseInt(count) + 1);
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080.')
});

