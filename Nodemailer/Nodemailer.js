const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (user) => {
  // console.log(user);
  try {
    // Email configuration
    const config = {
      service: "gmail",
      auth: {
        user: "jaideeppatidar3421@gmail.com",
        pass: "kljp uypu xzlf ldrh", // App password, not your email password
      },
    };

    const transporter = nodemailer.createTransport(config);

    // User's welcome email
    const userMailOptions = {
      from: '"hirefleX247.com" <jaideeppatidar3421@gmail.com>',
      to: user.email, // User email
      cc: "jaideeppatidar3421@gmail.com", // Company email receives a copy
      subject: "Your Employee ID and Login Details",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
          <h2>Welcome to Our Company!</h2>
          <p>Dear ${user.firstName} ${user.lastName},</p>
          <p>We are pleased to welcome you to the company. Below are your login details:</p>
          <ul>
            <li><strong>Employee ID:</strong> ${user.employeeId}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Password:</strong> ${user.rePassword}</li>
          </ul>
          <p>Please keep this information secure.</p>
          <p>Best regards,</p>
          <p>Your Company Name</p>
        </div>
      `,
      attachments: [
        {
          filename: "hirefleX247.com-dark.png",
          path: "./img/hirefleX247.com-dark.png",
          cid: "logo",
        },
      ],
    };

    // Company's notification email
    const companyMailOptions = {
      from: '"hirefleX247.com" <jaideeppatidar3421@gmail.com>',
      to: "jaideeppatidar3421@gmail.com", 
      subject: "New User Registration Notification",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>New User Registered Successfully!</h2>
          <p>A new user has been registered on the platform. Here are the details:</p>
          <ul>
            <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
            <li><strong>Email:</strong> ${user.email}</li>
          </ul>
          <p>Thank you!</p>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(userMailOptions); 
    console.log("Welcome email sent to user:", user.email);

    await transporter.sendMail(companyMailOptions); 
    console.log("Notification email sent to company.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendWelcomeEmail };
