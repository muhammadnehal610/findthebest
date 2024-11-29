"use server";

import { revalidatePath } from "next/cache";

export const addEvents = async (obj) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error("Failed to add events");
    }

    console.log("events added successfully");
    revalidatePath("/admin/events"); // Correct path
  } catch (error) {
    console.error("Error adding events:", error);
  }
};

export const getEvents = async () => {
  let Events = await fetch(`${process.env.BASE_URL}api/events`);
  Events = await Events.json();
  console.log("Events fetch successfully");

  return Events;

  revalidatePath("/admin/catageries");
};
