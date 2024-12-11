"use server";

import { revalidatePath } from "next/cache";

export async function addComment(obj) {
  try {
    const response = await fetch(`${process.env.BASE_URL}api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add comment");
    }

    const result = await response.json();
    console.log("Comment added successfully:", result);
    revalidatePath(`/Events/${obj.event}`);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: error.message };
  }
}

export async function getComments(eventId) {
  try {
    const url = new URL(`${process.env.BASE_URL}api/comment`);
    url.searchParams.append("event", eventId);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    console.log("Comments fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
