import { mailTransporter } from "../config/mail";

interface SendVerificationParams{
    email: string;

    code: string;
}

export async function sendVerificationEmail({
    email, code,
}: SendVerificationParams){
    const transporter = mailTransporter();
    
    await transporter.sendMail({
        from: process.env.MAIL_USER,

        to: email,

        subject: "Verify your Kuditrack account",

        html: `
            <div style="font-family: sans-serif;">
                <h2>Kuditrack Verification</h2>

                <p>Your verification code is:</p>

                <h1>${code}</h1>

                <p>This code expires in 10 minutes.</p>
            </div>`
    })
}