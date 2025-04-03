import nodemailer from 'nodemailer';

export const prerender = false;

export async function post(req, res) {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'smtp.mailtrap.io',
    auth: {
      user: process.env.MAILTRAP_USER,  
      pass: pocess.env.MAILTRAP_PASS,    },
  });

  const mailOptions = {
    from: email,
    to: 'your_email@example.com', 
    subject: `Nuevo mensaje de ${name}`,
    text: message,
    html: `<p>Nuevo mensaje de ${name}</p><p>Email: ${email}</p><p>Mensaje: ${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
}

