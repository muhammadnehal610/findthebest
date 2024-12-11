"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserCheckIcon, UserIcon, Loader2 } from "lucide-react";
import { goingToEvent } from "@/action/events";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function GoingButton({ eventId, userId, isInitiallyGoing }) {
  const [isGoing, setIsGoing] = useState(isInitiallyGoing);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleGoingToEvent = async () => {
    setIsLoading(true);
    try {
      await goingToEvent(eventId, userId);
      setIsGoing(!isGoing);
      toast({
        title: isGoing ? "Event Removed" : "Event Added",
        description: isGoing
          ? "You are no longer attending this event."
          : "You are now attending this event!",
      });
    } catch (error) {
      console.error("Error updating event attendance:", error);
      toast({
        title: "Error",
        description: "Failed to update event attendance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Button
      onClick={handleGoingToEvent}
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : isGoing ? (
        <UserCheckIcon className="mr-2 h-4 w-4" />
      ) : (
        <UserIcon className="mr-2 h-4 w-4" />
      )}
      {isLoading ? "Updating..." : isGoing ? "Going" : "Want to Go"}
    </Button>
  );
}
