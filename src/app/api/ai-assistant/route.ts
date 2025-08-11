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
          "Jawaban kamu harus dipisahkan per baris dan mudah dibaca. Gunakan bullet (-) untuk daftar bahan, dan angka (1., 2., dst) untuk langkah.",
        max_tokens: 512,
      },
    });

    // Tunggu sampai prediksi selesai
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

      return NextResponse.json({ result: output });
    } else {
      return NextResponse.json(
        { error: "Prediction gagal dijalankan" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error di API ai-assistant:", error);
    return NextResponse.json(
      { error: error.message || "Error saat panggil Granite AI" },
      { status: 500 }
    );
  }
}
