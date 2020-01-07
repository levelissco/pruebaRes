const conexion = require('../conexion');
const mailer = require('../js/mail');
const emailCtrl = {};

emailCtrl.sendEmail = (req, res) => {
    const { email, asunto, mensaje } = req.body;
    const mailOptions = {
        from: 'smarttech8970@gmail.com',
        to: email,
        subject: asunto,
        text: mensaje
    };
    const mail = new mailer('smarttech8970@gmail.com', 'pepapig01');
    mail.enviarCorreo(mailOptions);
    res.json({ text: 'Se envio correo' });
}
module.exports = emailCtrl;