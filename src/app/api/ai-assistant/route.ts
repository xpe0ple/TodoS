import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    let prediction = await replicate.predictions.create({
      version: "ibm-granite/granite-3.3-8b-instruct",
      input: {
        prompt,
        system_prompt:
          "Jawaban kamu harus dipisahkan per baris dan mudah dibaca. Gunakan bullet (-) untuk daftar bahan, dan angka (1., 2., dst) untuk langkah. Gunakan hanya 1 baris kosong antar poin.",
        max_tokens: 512,
      },
    });

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      prediction = await replicate.predictions.get(prediction.id);
    }

    if (prediction.status === "succeeded") {
      let output = prediction.output;

      if (Array.isArray(output)) {
        output = output.join(""); // jangan kasih spasi tambahan
      } else if (typeof output !== "string") {
        output = JSON.stringify(output);
      }

      // Rapikan: hilangkan spasi ganda antar kata, tapi tetap pertahankan baris kosong
      const formattedOutput = output
        .split("\n")
        .map(
          (line: string) => line.trim().replace(/\s+/g, " ") // ganti spasi ganda jadi 1
        )
        .join("\n");

      return NextResponse.json({ result: formattedOutput });
    } else {
      return NextResponse.json(
        { error: "Prediction gagal dijalankan" },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Error di API ai-assistant:", error);

    let message = "Error saat panggil Granite AI";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
