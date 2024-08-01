# Google API for Sending Emails

This documentation provides a detailed guide on using the Google API to send emails with attachments via Gmail. It utilizes OAuth2 for authentication and the Gmail API for email operations.

## Overview

The script allows you to send emails programmatically through Gmail, including support for attachments. This is particularly useful for automating email notifications or integrating email functionality into your applications.

## Prerequisites

1. **Google API Credentials**: Ensure you have the necessary credentials from the Google Developer Console:

   - `CLIENT_ID`
   - `CLIENT_SECRET`
   - `REDIRECT_URI`
   - `REFRESH_TOKEN`

2. **Environment Setup**: These credentials should be stored securely, typically in a `.env` file.

## Environment Configuration

Create a `.env` file in the root directory of your project with the following content:

```env
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=your_redirect_uri
REFRESH_TOKEN=your_refresh_token
```

## Package Installation

Install the necessary npm packages:

```bash
npm install dotenv googleapis
```

## Authentication

### OAuth2 Setup

The Gmail API uses OAuth2 for authentication. OAuth2 allows applications to obtain limited access to user accounts on an HTTP service. The OAuth2 credentials are used to generate an access token that grants the script permission to send emails on behalf of the user.

### Setting Up OAuth2 Client

The `google-auth-library` provides the `OAuth2` class, which is used to handle OAuth2 authentication. The `OAuth2` client requires `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI` from your Google API credentials. The `REFRESH_TOKEN` is used to obtain a new access token when the current one expires.

```javascript
require('dotenv').config();
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
```

## Email Creation

### Structure of Email with Attachments

Emails with attachments in MIME format are constructed using boundaries. A boundary is a string that separates different parts of the message. Each part of the email, whether it's the text body or an attachment, is separated by this boundary string.

### Creating the Email

The function `createEmailWithAttachments` constructs the email in MIME format. It includes the recipient, subject, body, and attachments.

```javascript
const createEmailWithAttachments = (mailOptions) => {
  const boundary = 'boundary';
  const emailParts = [];

  emailParts.push(
    `To: ${mailOptions.to}`,
    `Subject: ${mailOptions.subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary=${boundary}`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
    '',
    `${mailOptions.html || mailOptions.text}`,
    ''
  );

  mailOptions.attachments.forEach((attachment) => {
    emailParts.push(
      `--${boundary}`,
      `Content-Type: ${attachment.contentType}`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      '',
      attachment.content,
      ''
    );
  });

  emailParts.push(`--${boundary}--`);

  return emailParts.join('\r\n');
};
```

## Sending the Email

### Encoding the Email

The raw email content needs to be encoded in base64 URL-safe format, which replaces `+` with `-`, `/` with `_`, and removes padding (`=`).

### Sending the Email via Gmail API

The function `sendEmailUsingGmailAPI` handles the actual sending of the email using the Gmail API. The encoded email is sent as a raw string.

```javascript
const sendEmailUsingGmailAPI = async (mailOptions) => {
  const rawEmail = createEmailWithAttachments(mailOptions);

  const encodedEmail = Buffer.from(rawEmail)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedEmail,
    },
  });
};
```

## Main Function

The main function `MailSender` orchestrates the process of creating and sending the email.

```javascript
const MailSender = async (mailOptions) => {
  try {
    await sendEmailUsingGmailAPI(mailOptions);
  } catch (error) {
    throw new Error('Failed to send email');
  }
};

module.exports = MailSender;
```

## Example Usage

To use the `MailSender` function, provide the necessary email options including recipient, subject, body, and attachments.

```javascript
const MailSender = require('./path_to_your_mail_sender_file');

const mailOptions = {
  to: 'recipient@example.com',
  subject: 'Test Email with Attachments',
  html: '<h1>Hello</h1><p>This is a test email with attachments</p>',
  attachments: [
    {
      filename: 'test.txt',
      contentType: 'text/plain',
      content: Buffer.from('This is a test file').toString('base64'),
    },
  ],
};

MailSender(mailOptions)
  .then(() =>
  .catch((error) =>
```

## Conclusion

This guide provides a detailed overview of setting up and using the Google API to send emails with attachments via Gmail. By following the steps outlined, you can integrate email functionality into your applications seamlessly. For further details, refer to the [Gmail API Documentation](https://developers.google.com/gmail/api).

## Support/Help

For any questions related to the API, refer to the [Gmail API Documentation](https://developers.google.com/gmail/api) or contact support.
