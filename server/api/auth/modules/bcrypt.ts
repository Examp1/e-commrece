import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
    const saltRound: number = 10;
    return await bcrypt.hash(password, saltRound);
}
export async function comparePassword(textPwd: string, hashPwd: string) {
    return await bcrypt.compare(textPwd, hashPwd);
}
