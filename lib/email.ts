import nodemailer from "nodemailer";

// 1. Define your HTML template as a function so you can inject the workspace name
const workspaceCreatedTemplate = (workspaceName: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Workspace Created</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding-bottom: 20px; }
    .workspace-name { font-weight: bold; }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 30px;
      background-color:rgb(42, 90, 157);
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer { font-size: 0.8em; color: #777; padding-top: 30px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Track!</h1>
    </div>
    <p>Hi there,</p>
    <p>
      Good news – your new workspace
      <span class="workspace-name">"${workspaceName}"</span>
      has just been created successfully.
    </p>
    <p>
      You can now start adding projects, inviting teammates, and tracking your tasks
      all in one place.
    </p>
    <p style="text-align:center;">
      <a
        href="https://localhost:3000/workspaces"
        class="button"
      >
        View Your Workspaces
      </a>
    </p>
  </div>
</body>
</html>
`;

// 2. Set up transporter (as you already have)
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// 3. Update sendEmail to accept a workspaceName parameter
export const sendWorkspaceCreatedEmail = async (
  email: string,
  workspaceName: string
) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Your new workspace "${workspaceName}" is ready in Track!`,
      html: workspaceCreatedTemplate(workspaceName),
    });
    console.log(`Workspace creation email sent to ${email}`);
  } catch (error) {
    console.error("Email send error:", error);
  }
};
