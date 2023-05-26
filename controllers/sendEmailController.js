const sendEmailService = require('../services/sendEmailService');

module.exports = async function sendEmailController(req, res) {
  const { email, contentEmail } = req.body;
  const response = await sendEmailService(email, contentEmail);
  res.status(response.status).json(response);
}