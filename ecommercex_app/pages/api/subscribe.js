import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER_BREVO,
  port: process.env.SMTP_PORT_BREVO,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_LOGIN_BREVO, 
    pass: process.env.SMTP_PASSWORD_BREVO, 
  },
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { email } = req.body;

    let mailOptions = {
      from: process.env.SMTP_LOGIN_BREVO,
      to: email,
      subject: 'Subscription Confirmation',
      text: 'Thank you for subscribing to our newsletter.',
      html: '<p>Thank you for subscribing to our newsletter.</p>',
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Subscription confirmed.' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'There was an error confirming the subscription.' });
    }
  }  else if (req.method === 'GET') {
    // Handle GET request
    res.status(200).json({ message: 'This is a GET request.' });
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
