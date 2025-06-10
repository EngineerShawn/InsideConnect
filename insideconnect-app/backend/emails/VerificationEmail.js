// insideconnect-app/backend/emails/VerificationEmail.js
const React = require('react');

const VerificationEmail = ({ verificationCode }) => (
  React.createElement('div', null,
    React.createElement('h1', null, 'Welcome to InsideConnect!'),
    React.createElement('p', null, 'Thank you for registering. Please use the code below to verify your account:'),
    React.createElement('h2', null, verificationCode),
    React.createElement('p', null, 'If you did not request this, please ignore this email.')
  )
);

module.exports = { VerificationEmail };