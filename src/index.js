const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db.config');
const env = require('./config/env');
const routes = require('./routes/v1');

const app = express();
const port = env.port;

db.sequelize.sync({ force: false }).then(() => {
    console.log('Drop and resynchronize database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send('AZ Solusindo');
});

app.use('/v1', routes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
