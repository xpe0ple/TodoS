import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, // Key aman di backend
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: body.prompt,
          },
          {
            role: "system",
            content:
              "Jawaban kamu harus dipisahkan per baris dan mudah dibaca. Gunakan bullet (-) untuk daftar bahan, dan angka (1., 2., dst) untuk langkah.",
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
