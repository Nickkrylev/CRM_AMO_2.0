const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./routes/index');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
 // <-- ЭТО ОЧЕНЬ ВАЖНО
app.use(express.json());
app.use('/api', routes);

module.exports = app;
