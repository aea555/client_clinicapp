"use client";

import { Button} from "flowbite-react";
import React from "react";

interface Props {
  appointmentId: number;
}

export default function CancelAppointmentButton({ appointmentId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handlePress() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/cancel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, status: 2 }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Appointment cancel successful");
        window.location.reload();
      } else {
        console.log("Appointment cancel failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  return (
    <Button
      onClick={handlePress}
      className="bg-red-400"
      isProcessing={isProcessing}
      disabled={isProcessing}
    >
      İPTAL ET
    </Button>
  );
}
