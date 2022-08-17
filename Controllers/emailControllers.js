const nodemailer = require("nodemailer");
const sendMail = async (email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });
  const mailOptions = {
    from: `"Desi Village Team"<${process.env.EMAIL_ADDRESS}>`,
    to: `${process.env.EMAIL_ADDRESS}`,
    subject: subject,
    text: message,
  };
  try {
    await transporter.sendMail(mailOptions);

    return { message: `Email has been sent` };
  } catch (err) {
    return {
      message: "Email has not been sent due to some technical reason",
    };
  }
};
exports.sendEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const email_subject = `You got a Message from ${email}`;
    const email_message = req.body.message;
    const email_response = await sendMail(email, email_subject, email_message);
    if (email_response.message) {
      res.status(200).json({
        message: email_response.message,
      });
    } else {
      res.status(400).json({
        message: email_response.message,
      });
    }
  } catch (error) {
    return res.status(400).json("Error in sending email");
  }
};
