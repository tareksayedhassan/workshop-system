import GenerateJWT from "@/src/utils/GenerateJWT";
import { LoaginVaildated } from "@/src/utils/Vaildation/users/login";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const fetchUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        permissions: true,
      },
    });

    await LoaginVaildated({ email, password, fetchUser });

    const token = GenerateJWT({
      name: fetchUser?.name,
      email: fetchUser?.email,
      permissions: fetchUser?.permissions,
    });
    return NextResponse.json({ token: token }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
