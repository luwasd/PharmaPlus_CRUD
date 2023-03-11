const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const controllers = require('./controllers');
const verificarToken = require('./middlewares/verificarToken');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/user', verificarToken, controllers.getUserById);
app.post('/register', controllers.register);
app.post('/login', controllers.login);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    db();
});

module.exports = app;