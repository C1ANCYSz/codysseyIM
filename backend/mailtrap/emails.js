const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require('./emailTemplates');
require('express-async-errors');
const { MailtrapClient, MailtrapSender } = require('./mailTrapConfig');

exports.sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  const mailOptions = {
    from: {
      email: MailtrapSender.email,
      name: MailtrapSender.name,
    },
    to: recipient,
    subject: 'Verify your email address',
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      '{verificationCode}',
      verificationToken
    ),
    category: 'verification',
  };

  try {
    await MailtrapClient.send(mailOptions);
    console.log('Verification email sent successfully');
  } catch (err) {
    console.error('Error sending verification email:', err.message);
  }
};

exports.sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  const mailOptions = {
    from: {
      email: MailtrapSender.email,
      name: MailtrapSender.name,
    },
    to: recipient,
    subject: 'Welcome to our platform',
    html: WELCOME_EMAIL.replace('{name}', name),
    category: 'welcome',
  };

  try {
    await MailtrapClient.send(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (err) {
    console.error('Error sending welcome email:', err.message);
  }
};

exports.sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email }];

  const mailOptions = {
    from: {
      email: MailtrapSender.email,
      name: MailtrapSender.name,
    },
    to: recipient,
    subject: 'Reset your password',
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetToken),
    category: 'password-reset',
  };

  try {
    await MailtrapClient.send(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (err) {
    console.error('Error sending password reset email:', err.message);
  }
};

exports.sendPasswordResetSuccess = async (email) => {
  const recipient = [{ email }];

  const mailOptions = {
    from: {
      email: MailtrapSender.email,
      name: MailtrapSender.name,
    },
    to: recipient,
    subject: 'Password reset successful',
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    category: 'password-reset',
  };

  try {
    await MailtrapClient.send(mailOptions);
    console.log('Password reset success email sent successfully');
  } catch (err) {
    console.error('Error sending password reset success email:', err.message);
  }
};
