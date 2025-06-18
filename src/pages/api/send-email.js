import nodemailer from "nodemailer";
import dotenv from "detenv";

dotenv.cofig();
export const prerender = false; // Asegurar que el endpoint se ejecute en el servidor

export async function POST({ request }) {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
        console.error("❌ Datos incompletos");
        return new Response(JSON.stringify({ message: "Datos incompletos" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    console.log("📥 Datos recibidos:", { name, email, message });

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: "tu_email@ejemplo.com",
        subject: `Nuevo mensaje de ${name}`,
        html: `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Correo enviado correctamente");
        return new Response(
            JSON.stringify({ message: "Correo enviado correctamente" }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (err) {
        console.error("❌ Error al enviar correo:", err);
        return new Response(
            JSON.stringify({ message: "Error al enviar el correo" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
}
