const nodemailer = require("nodemailer");
require("dotenv").config()
const sendMail = async (email, confirmationCode) => {

  try {
    const transport = nodemailer.createTransport({
      service: process.env.service,
      auth: {
        user: process.env.user,
        pass: process.env.pass
      }
    })
    //console.log(process.env.user + process.env.pass)
    await transport.sendMail({
      from: 'Smile Spa ' + process.env.user,
      to: email,
      subject: "Xin hãy xác nhận email",
      text: "Mã xác nhận của bạn là: " + confirmationCode,
    })
  } catch (error) {
    console.log(error)
  }
}
module.exports = sendMail
