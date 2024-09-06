"use client"

import { Button } from "flowbite-react";
import React from "react";

interface Props {
  feedbackId: number;
}


export default function FeedbackRemoveButton({feedbackId} : Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/feedback/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: feedbackId, isDeleted: true }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Feedback update successful");
        window.location.reload();
      } else {
        console.log("Feedback update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Button
      isProcessing={isProcessing}
      disabled={isProcessing}
      onClick={handleSubmit}
      className="bg-red-400"
    >
      KALDIR
    </Button>
  );
}
