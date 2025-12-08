import { NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_TITLE = "신청";
const HEADER = [
  "타임스탬프",
  "성함",
  "전화번호",
  "성별",
  "연령대",
  "운동목적",
  "목적세부",
  "보유도구",
  "주소",
  "가능시간대",
] as const;

type LeadPayload = {
  name: string;
  phone: string;
  gender: "여성" | "남성" | "";
  ageRange: "10대" | "20대" | "30대" | "40대" | "50대" | "60대 이상" | "";
  purposes: string[];
  purposeDetail: string;
  equipments: string;
  address: string;
  addressDetail: string;
  calendarKeys: string[];
};

function getJwt() {
  const client_email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
  let private_key = process.env.GOOGLE_SHEETS_PRIVATE_KEY!;
  private_key = private_key.replace(/\\n/g, "\n"); // \n 복원

  return new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

async function ensureSheetAndHeader(sheets: any, spreadsheetId: string) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const has = meta.data.sheets?.some((s: any) => s.properties?.title === SHEET_TITLE);

  if (!has) {
    console.log(`[Sheets] addSheet: ${SHEET_TITLE}`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests: [{ addSheet: { properties: { title: SHEET_TITLE } } }] },
    });
  }

  // 헤더 보증 (A1:J1)
  console.log("[Sheets] write header");
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SHEET_TITLE}'!A1:J1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [HEADER as unknown as string[]] },
  });
}

export async function GET(req: Request) {
  // 디버그 엔드포인트: /api/lead?debug=1
  const url = new URL(req.url);
  if (url.searchParams.get("debug") !== "1") {
    return NextResponse.json({ ok: true, message: "lead API ready" });
  }

  try {
    const auth = getJwt();
    await auth.authorize();
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const meta = await sheets.spreadsheets.get({ spreadsheetId });

    const info = {
      spreadsheetId,
      title: meta.data.properties?.title,
      sheets: (meta.data.sheets || []).map((s: any) => ({
        title: s.properties?.title,
        sheetId: s.properties?.sheetId,
        index: s.properties?.index,
      })),
    };
    return NextResponse.json({ ok: true, info });
  } catch (e: any) {
    console.error("[GET /api/lead?debug] error:", e?.message || e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  if (!spreadsheetId) {
    return NextResponse.json({ ok: false, error: "Missing GOOGLE_SHEETS_SPREADSHEET_ID" }, { status: 500 });
  }

  try {
    const body = (await req.json()) as LeadPayload;

    const auth = getJwt();
    await auth.authorize();
    const sheets = google.sheets({ version: "v4", auth });

    await ensureSheetAndHeader(sheets, spreadsheetId);

    const now = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Seoul",
    }).format(new Date());

    const row = [
      now,
      body.name ?? "",
      body.phone ?? "",
      body.gender ?? "",
      body.ageRange ?? "",
      (body.purposes || []).join(", "),
      body.purposeDetail ?? "",
      body.equipments ?? "",
      [body.address, body.addressDetail].filter(Boolean).join(" "),
      (body.calendarKeys || []).join(", "),
    ];

    console.log("[POST /api/lead] spreadsheetId:", spreadsheetId);
    console.log("[POST /api/lead] sheet:", SHEET_TITLE, "row:", row);

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${SHEET_TITLE}'!A1`,           // 보수적: A1 기준 append
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [row] },
    });

    const updated = result.data.updates;
    console.log("[Sheets] append updates:", updated);

    if (!updated || !updated.updatedRows || updated.updatedRows < 1) {
      // 여기에 걸리면 실제로는 쓰이지 않은 상태 — 에러로 반환
      return NextResponse.json(
        { ok: false, error: "Append returned no updated rows", details: updated },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, updated }, { status: 200 });
  } catch (e: any) {
    console.error("[/api/lead] error:", e?.errors || e?.message || e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 },
    );
  }
}
