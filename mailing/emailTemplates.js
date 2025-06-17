exports.VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(to right, rebeccapurple, #6a0dad);
      color: white;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 24px;
    }
    .code {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 8px;
      color: rebeccapurple;
      margin: 24px 0;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      padding: 16px;
      background-color: #f1f1f1;
    }
    p {
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Thank you for signing up! Your verification code is:</p>
      <div class="code">{verificationCode}</div>
      <p>Enter this code on the verification page to complete your registration.</p>
      <p>This code will expire in 15 minutes for security reasons.</p>
      <p>If you didn't create an account with us, please ignore this email.</p>
      <p>Best regards,<br><strong>CODYSSEY</strong></p>
    </div>
    <div class="footer">
      This is an automated message, please do not reply to this email.
    </div>
  </div>
</body>
</html>
`;

exports.PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(to right, rebeccapurple, #6a0dad);
      color: white;
      text-align: center;
      padding: 24px;
    }
    .content {
      padding: 24px;
    }
    .icon-circle {
      background-color: rebeccapurple;
      color: white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      font-size: 30px;
      margin: 0 auto 24px auto;
      text-align: center;
    }
    ul {
      padding-left: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      background-color: #f1f1f1;
      padding: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Password Reset Successful</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Your password has been successfully reset.</p>
      <div class="icon-circle">✓</div>
      <p>If you didn't initiate this, contact support immediately.</p>
      <p>Security recommendations:</p>
      <ul>
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication</li>
        <li>Don’t reuse passwords across websites</li>
      </ul>
      <p>Best regards,<br><strong>CODYSSEY</strong></p>
    </div>
    <div class="footer">
      This is an automated message, please do not reply.
    </div>
  </div>
</body>
</html>
`;

exports.PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(to right, rebeccapurple, #6a0dad);
      color: white;
      padding: 24px;
      text-align: center;
    }
    .content {
      padding: 24px;
    }
    .btn {
      display: inline-block;
      background-color: rebeccapurple;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      margin: 24px auto;
      text-align: center;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      background-color: #f1f1f1;
      padding: 16px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your password.</p>
      <p>If this wasn't you, you can safely ignore this message.</p>
      <div style="text-align: center;">
        <a href="{resetURL}" class="btn">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour.</p>
      <p>Best regards,<br><strong>CODYSSEY</strong></p>
    </div>
    <div class="footer">
      This is an automated message, please do not reply.
    </div>
  </div>
</body>
</html>
`;

exports.WELCOME_EMAIL = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Our Platform</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f3f4f6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(to right, rebeccapurple, #6a0dad);
      color: white;
      text-align: center;
      padding: 24px;
      border-radius: 10px 10px 0 0;
    }
    h1 {
      margin: 0;
    }
    .footer {
      margin-top: 24px;
      font-size: 12px;
      text-align: center;
      color: #888;
      border-top: 1px solid #eaeaea;
      padding-top: 16px;
    }
    p {
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome, {name}!</h1>
    </div>
    <p>Hello,</p>
    <p>We're thrilled to have you join our platform. Get ready for an awesome experience!</p>
    <p>If you have any questions or need help, just reach out to our support team—we're here for you.</p>
    <p>Best regards,<br><strong>CODYSSEY</strong></p>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Our Platform. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
