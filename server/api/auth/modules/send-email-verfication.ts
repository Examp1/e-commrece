export async function sendEmailVerification(receiverEmail: string, otpCode: string) {
    const nodeMailer = useNodeMailer();
    await nodeMailer.sendMail({
        subject: "Email verifaction",
        text: "Hello use this code to verify your email adsress: " + otpCode,
        to: receiverEmail,
    });
}
