"use server";

import crypto from "crypto";

export async function uploadFile(categoryData) {
  const cloudName = process.env.CLOUDNERY_API_NAME;
  const apiKey = process.env.CLOUDNERY_API_KEY;
  const apiSecret = process.env.CLOUDNERY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary configuration is missing");
  }

  const timeStamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timeStamp, apiSecret);

  const file = categoryData.get("thumbnail");
  if (!file) {
    throw new Error("No file uploaded");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timeStamp.toString());
  formData.append("signature", signature);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
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

// Example usage (uncomment to test)
// async function testUpload() {
//   const mockFormData = new FormData()
//   mockFormData.append('thumbnail', new Blob(['test file content'], { type: 'image/png' }), 'test.png')
//   try {
//     const result = await uploadFile(mockFormData)
//     console.log('Test upload result:', result)
//   } catch (error) {
//     console.error('Test upload error:', error)
//   }
// }
// testUpload()
