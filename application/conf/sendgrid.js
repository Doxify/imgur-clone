const sgMail = require('@sendgrid/mail');
const apiKey = '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';
sgMail.setApiKey(apiKey);

module.exports = sgMail;