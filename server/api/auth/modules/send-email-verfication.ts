export async function sendEmailVerification(receiverEmail: string, otpCode: string) {
    const nodeMailer = useNodeMailer();
    console.log(receiverEmail, otpCode);
    console.log(nodeMailer);
    await nodeMailer.sendMail({
        subject: "Email verifaction",
        text: "Hello use this code to verify your email adsress: " + otpCode,
        to: receiverEmail,
    });
}
