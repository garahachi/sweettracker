const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Check out the app at http://localhost:${PORT}`);
});