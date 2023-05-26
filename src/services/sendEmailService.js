const nodemailer = require('nodemailer');

module.exports = async function sendEmailService(email, contentEmail) {
  let response;
  if (typeof email !== 'string' && typeof contentEmail !== 'string') {
    response = { status: 400, sent: false, error: 'Parâmetros inválidos na requisição' };
    return response;
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
      to: email,
      subject: 'Feedback do projeto Solar System eviado por',
      text: contentEmail,
    };
  
    await transporter.sendMail(mailOptions);
    response = { status: 201, sent: true, error: 'E-mail enviado com sucesso' };
  } catch (error) {
    console.log('Erro ao enviar o e-mail:', error);
    response = { status: 500, sent: true, error: 'Erro ao enviar o e-mail', errorMsg: error};
  }
  return response;
}