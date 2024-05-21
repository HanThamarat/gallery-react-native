const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');

const app = express();

const swaggerOptions = {
    definition: {
        openaoi: '3.0.0',
        info: {
            title: 'Api Doc',
            version: '1.0.0',
            description: 'Api Aora App',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
    },
    apis: ['server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-aora', swaggerUi.serve,  swaggerUi.setup(swaggerSpec));

module.exports = app;
