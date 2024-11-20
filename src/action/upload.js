"use server";

import crypto from "crypto";

export async function uploadFile(formData) {
  const cloudName = process.env.CLOUDNERY_API_NAME;
  const apiKey = process.env.CLOUDNERY_API_KEY;
  const apiSecret = process.env.CLOUDNERY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration is missing");
  }

  const timeStamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timeStamp, apiSecret);

  const file = formData.get("thumbnail");
  if (!file || !(file instanceof File)) {
    throw new Error("No file uploaded or invalid file");
  }

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("api_key", apiKey);
  uploadFormData.append("timestamp", timeStamp.toString());
  uploadFormData.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Upload successful:", data.secure_url);
      return data.secure_url;
    } else {
      console.error("Upload failed:", data.error.message);
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

function generateSignature(timestamp, apiSecret) {
  return crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
}
