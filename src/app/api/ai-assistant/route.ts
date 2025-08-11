import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Validasi input
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt harus berupa teks." },
        { status: 400 }
      );
    }

    // Validasi token
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "REPLICATE_API_TOKEN belum diatur." },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

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
        output = output.join("");
      } else if (typeof output !== "string") {
        output = JSON.stringify(output);
      }

      const formattedOutput = output
        .split("\n")
        .map((line: string) => line.trim().replace(/\s+/g, " "))
        .join("\n");

      return NextResponse.json({ result: formattedOutput });
    } else {
      return NextResponse.json(
        { error: "Prediction gagal dijalankan." },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Error di API ai-assistant:", error);

    let message = "Error saat memproses permintaan AI.";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
