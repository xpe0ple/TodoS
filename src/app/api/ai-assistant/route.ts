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

    // Tunggu sampai selesai
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      prediction = await replicate.predictions.get(prediction.id);
    }

    console.log("Prediction result:", prediction); // Debug

    if (prediction.status === "succeeded") {
      let output = prediction.output;

      if (Array.isArray(output)) {
        output = output.join(""); // gabungkan tanpa spasi tambahan
      } else if (typeof output !== "string") {
        output = JSON.stringify(output);
      }

      // Kalau output kosong, kasih placeholder
      if (!output || output.trim() === "") {
        output = "[AI tidak memberikan jawaban]";
      }

      // Rapikan teks
      const formattedOutput = output
        .split("\n")
        .map((line: string) => line.trim().replace(/\s+/g, " "))
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
