// src/app/api/submit-sheet/route.ts
import { NextResponse } from "next/server";
import { appendReservationRow } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 기대하는 필드들 (현재 챗봇 폼 기준)
    const {
      name = "",
      gender = "",
      ageRange = "",
      purpose = "",
      purposeDetail = "",
      equipments = "",
      address = "",
      addressDetail = "",
    } = body || {};

    const ts = new Date();
    const timestamp = ts.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    // 시트에 적을 한 줄 (열 순서 자유)
    const row = [
      timestamp,           // 접수 시간
      name,
      gender,
      ageRange,
      purpose,
      purposeDetail,
      equipments,
      address,
      addressDetail,
      "웹 챗봇",           // 접수 경로
    ];

    await appendReservationRow(row);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[submit-sheet] error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "unknown error" },
      { status: 500 }
    );
  }
}
