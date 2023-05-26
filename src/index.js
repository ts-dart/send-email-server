const express = require('express');
const cors = require('cors');
const sendEmailController = require('./controllers/sendEmailController');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', sendEmailController);
app.get('/tarodando', (_req, res) => res.send('sim'));

const PORT = 8080;
app.listen(PORT, () => console.log('online na porta: ', PORT));
