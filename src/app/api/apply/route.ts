import { google } from "googleapis";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // body는 ChatbotModal에서 보내줄 필드들입니다.
    const {
      name,
      gender,
      ageRange,
      purposes,         // string[]  (복수 선택)
      purposeDetail,    // string
      equipments,       // string
      address,          // string
      addressDetail,    // string
      timeSlots,        // string[]  (요일/시간대 복수 선택)
    } = body || {};

    // env
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const clientEmail   = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
    const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!;

    const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 서울 타임스탬프
    const ts = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());

    const values = [[
      ts,
      name ?? "",
      gender ?? "",
      ageRange ?? "",
      Array.isArray(purposes) ? purposes.join(", ") : (purposes ?? ""),
      purposeDetail ?? "",
      equipments ?? "",
      `${address ?? ""} ${addressDetail ?? ""}`.trim(),
      Array.isArray(timeSlots) ? timeSlots.join(", ") : (timeSlots ?? ""),
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "신청!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error("[apply] error:", err?.message || err);
    return new Response(JSON.stringify({ ok: false, message: "FAILED" }), { status: 500 });
  }
}
