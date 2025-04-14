const nodemailer = require('nodemailer');
const {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require('./emailTemplates');

let testAccount;
let transporter;

(async () => {
  testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'a7mdmo2mna7md@gmail.com',
      pass: 'drrh qjkr uvwt urzs',
    },
  });
})();

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Dev Mail 👨‍💻" <${testAccount.user}>`,
      to,
      subject,
      html,
    });

    console.log(`📨 Email sent: ${info.messageId}`);
    console.log(`🔗 Preview: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    console.error(`❌ Error sending email: ${err.message}`);
  }
};

exports.sendVerificationEmail = async (email, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    '{verificationCode}',
    verificationToken
  );
  await sendEmail(email, 'Verify your email address', html);
};

exports.sendWelcomeEmail = async (email, name) => {
  const html = WELCOME_EMAIL.replace('{name}', name);
  await sendEmail(email, 'Welcome to our platform', html);
};

exports.sendPasswordResetEmail = async (email, resetToken) => {
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
    '{resetURL}',
    resetToken
  );
  await sendEmail(email, 'Reset your password', html);
};

exports.sendPasswordResetSuccess = async (email) => {
  await sendEmail(
    email,
    'Password reset successful',
    PASSWORD_RESET_SUCCESS_TEMPLATE
  );
};
