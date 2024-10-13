import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authorize } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const auth = await authorize(email, password);

    if (!auth) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }

    // Setting the cookie using NextResponse
    const response = NextResponse.json({
      message: "success",
      data: { token: auth.token, ...auth.user },
    });

    response.cookies.set("serverToken", auth.token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
