import { Request, Response } from 'express';
import { IContact } from '../interfaces/IContact';
import { sendEmail } from '../config/mailer';

export const sendContactEmail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message }: IContact = req.body;

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    const emailSent = await sendEmail(
      email,
      `Portfolio Contact: ${subject}`,
      emailHtml
    );

    if (!emailSent) {
      throw new Error('Failed to send email');
    }

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error in sendContactEmail:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};