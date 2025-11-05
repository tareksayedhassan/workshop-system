import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/utils/db";
import bcrypt from "bcrypt";
import { Roles } from "@prisma/client";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "15");
    const searchQuery = searchParams.get("search") || "";

    const addressFilter =
      searchQuery.trim() !== ""
        ? {
            name: {
              contains: searchQuery,
            },
          }
        : {};

    const total = await prisma.user.count({
      where: addressFilter,
    });

    const users = await prisma.user.findMany({
      where: addressFilter,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json(
        {
          message: "not found users",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: users,
        total: total,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "Email aleady exists",
        },
        { status: 400 }
      );
    }
    console.log(body.role);
    const HashedPassword = await bcrypt.hash(body.password, 10);
    const role =
      body.role === "ReaderAndwrater" ? Roles.ReaderAndwrater : Roles.Wrater;
    console.log(role);
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: HashedPassword,
        role: role,
      },
    });

    return NextResponse.json(
      {
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "internal server Error",
      },
      { status: 500 }
    );
  }
}
