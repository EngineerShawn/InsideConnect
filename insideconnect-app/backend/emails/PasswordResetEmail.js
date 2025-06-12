// insideconnect-app/backend/emails/PasswordResetEmail.js
const React = require('react');

const PasswordResetEmail = ({ resetLink }) => (
    React.createElement('div', null,
        React.createElement('h1', null, 'Password Reset Request'),
        React.createElement('p', null, 'You requested a password reset for your InsideConnect account. Please click the link below to set a new password:'),
        React.createElement('a', { href: resetLink, target: '_blank' }, 'Reset Your Password'),
        React.createElement('p', null, 'This link will expire in 15 minutes.'),
        React.createElement('p', null, 'If you did not request this, please ignore this email.')
    )
);

module.exports = { PasswordResetEmail };