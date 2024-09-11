"use client"

import { Button } from "flowbite-react";
import React from "react";

interface Props {
  appointmentId: number
}

export default function CompleteAppointment({appointmentId} : Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function completeAppointment() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          status: 1
        }),
      });

      const data: {
        success: boolean;
        error: string | undefined | null;
      } = await res.json();

      if (data.success) {
        console.log("update successful");
      } else {
        console.log("update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex flex-row gap-6">
      <Button isProcessing={isProcessing} disabled={isProcessing} onClick={completeAppointment} className="bg-red-400">Randevuyu Tamamla</Button>
    </div>
  );
}
