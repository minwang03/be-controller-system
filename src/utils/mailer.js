const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'minhquangdoan099@gmail.com',       
    pass: 'sqti feai oiqg mkpe',         
  },
});

const sendOtpMail = async (to, otp) => {
  const mailOptions = {
    from: 'minhquangdoan099@gmail.com',
    to: to,
    subject: 'Mã OTP xác nhận',
    text: `Mã OTP của bạn là: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpMail };
