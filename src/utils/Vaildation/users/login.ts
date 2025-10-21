import prisma from "@/src/utils/db";
import bcrypt from "bcrypt";
type LoginClient = {
  email: string;
  password: string;
  fetchUser: any;
};
export async function LoaginVaildated(payload: LoginClient) {
  try {
    const { email, password, fetchUser } = payload;

    if (!fetchUser) {
      throw new Error("User Not Found");
    }

    if (!password) {
      throw new Error("Password Is Missing");
    }

    const MatchPassord = await bcrypt.compare(password, fetchUser.password);

    if (!MatchPassord) {
      throw new Error("Invalid Password");
    }
  } catch (error) {
    throw error;
  }
}
