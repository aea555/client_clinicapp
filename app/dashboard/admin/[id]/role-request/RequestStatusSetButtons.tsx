"use client";

import { Button, TableCell } from "flowbite-react";
import React from "react";

interface Props {
  requestId: number;
  role: "biochemist" | "doctor";
}

export default function RequestStatusSetButtons({ requestId, role }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [isProcessingAccept, setIsProcessingAccept] =
    React.useState<boolean>(false);
  const [isProcessingDeny, setIsProcessingDeny] =
    React.useState<boolean>(false);

  async function handleStatusChange(type: number) {
    setIsProcessing(true);
    type === 1 ? setIsProcessingAccept(true) : setIsProcessingDeny(true);
    try {
      const res = await fetch("/api/roleRequest/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, type, role }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Status update successful");
        window.location.reload();
      } else {
        console.log("Status update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
      type === 1 ? setIsProcessingAccept(false) : setIsProcessingDeny(false);
    }
  }
  return (
    <>
      <TableCell className="flex flex-row gap-3">
        <Button
          onClick={() => handleStatusChange(1)}
          className="bg-green-400"
          isProcessing={isProcessingAccept}
          disabled={isProcessing}
        >
          ONAYLA
        </Button>
        <Button
          onClick={() => handleStatusChange(2)}
          className="bg-red-400"
          isProcessing={isProcessingDeny}
          disabled={isProcessing}
        >
          REDDET
        </Button>
      </TableCell>
    </>
  );
}
