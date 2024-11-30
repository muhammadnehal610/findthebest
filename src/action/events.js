"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const getEvents = async (category) => {
  console.log("category in action=>", category);

  let Events = await fetch(
    `${process.env.BASE_URL}api/events?category=${category ? category : ""}`
  );
  Events = await Events.json();
  console.log("Events fetch successfully");

  return Events;

  revalidatePath("/admin/catageries");
};
export const getSingleEvent = async (id) => {
  console.log("id in action=>", id);

  let Event = await fetch(`${process.env.BASE_URL}api/events/${id}`);
  if (Event.ok) {
    Event = await Event.json();
    console.log("Events fetch successfully");
    return Event;
  } else {
    redirect("/not-found");
  }

  revalidatePath("/admin/catageries");
};
