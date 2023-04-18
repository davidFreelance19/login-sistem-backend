import nodemailer from "nodemailer";
export const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Información del Email
  const info = await transport.sendMail({
    from: ' "Login-MERN" <usuarios@login.com> ',
    to: email,
    subject: "Login-MERN Comprueba tu cuenta",
    text: "Comprueba tu cuenta en Login-MERN",
    html: `
        <p>Hola: ${nombre}. Comprueba tu cuenta en Login-MERN</p>
        <p>Confirma tu cuenta en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">comprobar cuenta</a></p>
        <p>Si tu no creaste está cuenta, puedes ignorar el mensaje</p>
    `,
  });
};
export const olvidePasswordEmail = async (datos) => {
  const { nombre, email, token } = datos;
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  // Información del Email
  const info = await transport.sendMail({
    from: ' "Login-MERN" <usuarios@login.com> ',
    to: email,
    subject: "Login-MERN Reestablecer tu Password",
    text: "Comprueba tu cuenta en Login-MERN",
    html: `
        <p>Hola: ${nombre}. Haz solicitado reestablecer tu password en Login-MERN</p>
        <p>Para generar un nuevo password da click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/olvide-contraseña/${token}">Reestablecer password</a></p>
        <p>Si tu no solicitaste reestablecer tu password, puedes ignorar el mensaje</p>
    `,
  });
};
