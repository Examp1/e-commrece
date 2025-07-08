import prisma from "~/lib/prisma";
import { comparePassword } from "./modules/bcrypt";
import { loginShema } from "./modules/validateUser";
import { signAccessToken, signRefreshToken } from "./modules/jwtToken";
import { tr } from "zod/v4/locales";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    const result = loginShema.safeParse({ email, password });

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

    if (!userExist) {
        throw createError({
            statusCode: 422,
            message: "Email or password invalid",
        });
    }

    const isValidPwd = await comparePassword(password, userExist?.password);

    if (isValidPwd) {
        const [accessToken, refreshToken] = await Promise.all([
            signAccessToken(userExist?.id),
            signRefreshToken(userExist?.id),
        ]);
        const data = {
            token: {
                accessToken,
                refreshToken,
            },
            user: userExist,
            isLoggedIn: true
        }
        return { message: "User loggin succesfully", data };
    } else {
        throw createError({
            statusCode: 422,
            message: "Email or password invalid",
        });
    }
});
