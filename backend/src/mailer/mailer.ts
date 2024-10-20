import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail as an example (or replace with another service like SendGrid)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html, // Use html instead of text
    });
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
