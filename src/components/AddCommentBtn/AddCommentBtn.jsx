"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { addComment } from "@/action/comment";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CommentForm({ eventId, userId }) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addComment({
        event: eventId,
        user: userId,
        comment: comment,
      });
      setComment("");
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully!",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        className="flex-grow"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
      />
      <Button type="submit" disabled={isLoading || !comment.trim()}>
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          "Post Comment"
        )}
      </Button>
    </form>
  );
}
