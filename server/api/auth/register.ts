import prisma from "@@/lib/prisma";
import { hashPassword } from "./modules/bcrypt";
import { registerShema } from "./modules/validateUser";
import { generateOTP } from "./modules/generate-otp-code";
import { sendEmailVerification } from "./modules/send-email-verfication";
import { USER_EMAIL_TYPE, USER_ROLE } from "./modules/user.constant";

export default defineEventHandler(async (event) => {
    const { name, email, password } = await readBody(event);

    const result = registerShema.safeParse({ name, email, password });

    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: "Validation error",
            data: result.error.flatten(),
        });
    }

    const userExist = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (userExist) {
        throw createError({
            statusCode: 400,
            message: "This email is alredy been taken",
        });
    }
    const otpCode = generateOTP();
    const hashPwd = await hashPassword(password);

    await sendEmailVerification(email, otpCode);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            isValidEmail: USER_EMAIL_TYPE.INVALID_EMAIL,
            otpCode: otpCode,
            password: hashPwd,
            role: USER_ROLE.CUSTOMER
        },
    });

    return { message: "User created successfuly", user, redirect: true };
});
