import EventList from "@/components/EventList/EventList";
import Header from "@/components/Header/Header";
import { Button } from "@/components/ui/button";

import { getEvents } from "@/action/events";
import { getCategoryData } from "@/action/category";
import { auth } from "../../auth";

export default async function Home({ searchParams }) {
  console.log("searchparams=>", searchParams);
  const { category } = searchParams;

  const session = await auth();
  const events = await getEvents(category);
  const categories = await getCategoryData();
  return (
    <main className="min-h-screen bg-gray-100">
      <Header session={session} />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Events Near You
          </h1>
          <p className="text-xl mb-8">
            Find the best events, meetups, and activities in your area.
          </p>
          <Button size="lg" variant="secondary">
            <a
              href="#events"
              className="block "
              role="button"
              aria-label="Explore Events"
            >
              Explore Events
            </a>
          </Button>
        </div>
      </section>

      {/* Event List Section */}
      <section id="events">
        <EventList eventsList={events} categoriesList={categories} />
      </section>
    </main>
  );
}
