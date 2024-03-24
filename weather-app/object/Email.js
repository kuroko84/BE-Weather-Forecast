const nodemailer = require("nodemailer");

class Email {
  constructor(from, to, subject, text, html) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }
  async send() {
    console.log(`Sending email from ${this.from} to ${this.to}`);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: this.from,
        pass: "ddrw upjy qpty pgkc",
      },
    });
    try {
      // Gửi email
      const info = await transporter.sendMail({
        from: this.from,
        to: this.to,
        subject: this.subject,
        text: this.text,
        html: this.html,
      });
      console.log("Message sent: %s", info.messageId);
      return "successfully";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = Email;
