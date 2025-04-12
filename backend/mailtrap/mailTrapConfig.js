const { MailtrapClient } = require('mailtrap');
require('dotenv').config();

const TOKEN = process.env.MAILTRAP_TOKEN;

if (!TOKEN) {
  throw new Error(
    'Mailtrap token is not defined. Please check your .env file.'
  );
}

exports.MailtrapClient = new MailtrapClient({
  token: TOKEN,
});

exports.MailtrapSender = {
  email: 'clancy@demomailtrap.co',
  name: 'Mailtrap Test',
};
