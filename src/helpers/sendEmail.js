import { resend } from "../lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";

export async function sendVerificationEmail(email, username, verifyCode) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: 'Verification mail sent successfully.'}    
    } catch (error) {
        console.log("email error");
        return {success: false, message: 'Failed to send verification email.', error}    
    }
}
