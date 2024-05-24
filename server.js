const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', async (req, res) => {
    return res.status(200).json({message: 'hello world!!!!'});
});

readdirSync('./router').map((r) => app.use('/api', require('./router/' + r)));

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
app.use('/gallery', express.static('./img/galleryImage'));

app.listen(port, () => {
    return console.log(`server runing port ${port}`);
});

module.exports = app;