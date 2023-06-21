require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.SERVER_PORT ? process.env.SERVER_PORT : 8080;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.status(200).send('rodando'))
app.post('/', sendEmail);

app.listen(PORT, () => console.log('online na porta: ', PORT));

async function sendEmail(req, res) {
  if (typeof req.body.contentEmail !== 'string') {
    res.status(400).json({ sent: false, error: 'Parâmetros inválidos na requisição' });
    return 0;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS
      }
    });

    const mailOptions = {
      from: 'thiagoedusan5.11@outlook.com',
      to: req.body.email ? req.body.email : '',
      subject: 'Feedback',
      text: req.body.contentEmail,
    };
  
    await transporter.sendMail(mailOptions);
    res.status(201).json({ sent: true, error: 'E-mail enviado com sucesso' });
  } catch (error) {
    console.log('Erro ao enviar o e-mail:', error);
    res.status(500).json({ sent: false, error: 'Erro ao enviar o e-mail', errorMsg: error});
  }
}
