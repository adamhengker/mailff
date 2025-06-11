
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/send-email', async (req, res) => {
    const { email, playerId, subject } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; background-color: #f3f3f3; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
        <div style="background-color: #c30000; padding: 20px; text-align: center;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Garena_logo.svg/2560px-Garena_logo.svg.png" alt="Garena" style="width: 100px; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0;">Garena Free Fire Indonesia</h2>
        </div>
        <div style="padding: 30px; font-size: 15px; color: #333;">
          <p>Halo Survivor,</p>
          <p>Kami mendeteksi adanya aktivitas tidak wajar pada akun Free Fire Anda (ID: <strong>${playerId}</strong>).</p>
          <p>Jika tidak dikonfirmasi dalam 24 jam, akun Anda berisiko ditangguhkan sementara atau permanen.</p>
          <p>Silakan lakukan verifikasi:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="#" style="background-color: #c30000; padding: 12px 20px; color: white; text-decoration: none; border-radius: 5px;">Verifikasi Akun Sekarang</a>
          </div>
          <p>Hormat kami,<br>Tim Keamanan Garena Free Fire</p>
        </div>
        <div style="background: #f0f0f0; text-align: center; font-size: 12px; padding: 10px; color: #777;">© 2025 Garena International. All Rights Reserved.</div>
      </div>
    </div>`;

    try {
        await transporter.sendMail({
            from: `"Garena Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            html: htmlTemplate,
        });
        res.send('Email berhasil dikirim!');
    } catch (err) {
        console.error(err);
        res.send('Gagal mengirim email.');
    }
});

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});
