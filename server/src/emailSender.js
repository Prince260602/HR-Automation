import nodemailer from 'nodemailer';
import fs from "fs"

async function sendEmail(to, subject, text, attachmentPath) {
    // Check if the recipient email is provided
    if (!to || !to.trim()) {
        console.error('Recipient email address is not defined or empty.');
        return;
    }
    
    console.log('Preparing to send email to:', to);  // Debug check

    let transporter = nodemailer.createTransport({
        service: "gmail", 
        auth: {
            user: process.env.NODE_EMAIL,
            pass: process.env.NODE_PASSWORD
        }
    });

    let mailOptions = {
        from: process.env.NODE_EMAIL,
        to: to,
        subject: subject || "Email with attachment",
        text: text || "Please find the attached file.",
        attachments: [
          {
            path: attachmentPath  // Make sure the file path is valid
          }
        ]
    };

    // Check the validity of the file path before sending
    if (!attachmentPath || !fs.existsSync(attachmentPath)) {
        console.error('Attachment path is invalid or file does not exist:', attachmentPath);
        return;
    }

    console.log('Sending email with attachment from:', process.env.NODE_EMAIL);
    console.log('Attachment path:', attachmentPath);  // Debug check

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error occurred while sending email:', err);
        } else {
            console.log('Email sent successfully to', mailOptions.to);  // Debug check
            console.log('Mail info:', info);  // Debug info
        }
    });
}

export default sendEmail;