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
    revalidatePath("/admin/events");
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
};

export const goingToEvent = async (id, userId) => {
  console.log("id in action=>", id);

  try {
    const response = await fetch(
      `${process.env.BASE_URL}api/events/${id}/going`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update event attendance");
    }

    const data = await response.json();
    console.log("Event updated successfully");
    revalidatePath(`/events/${id}`);
    return data;
  } catch (error) {
    console.error("Error updating event attendance:", error);
    throw error;
  }
};
