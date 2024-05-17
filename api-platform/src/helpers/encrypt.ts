import bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}