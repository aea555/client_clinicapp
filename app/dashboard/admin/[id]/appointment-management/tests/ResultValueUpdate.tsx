"use client";

import { Button, TextInput } from "flowbite-react";
import React from "react";

interface Props {
  id: number;
  biochemistId: number;
  appointmentTestId: number;
  value: string;
}

export default function ResultValueUpdate({
  id,
  biochemistId,
  appointmentTestId,
  value,
}: Props) {
  const [resultValue, setResultValue] = React.useState<string>(value);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const v = event.target.value;
    setResultValue(v);
  }

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/testresults/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          biochemistId,
          appointmentTestId,
          value: resultValue,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Appointment update successful");
        window.location.reload();
      } else {
        console.log("Appointment update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <TextInput value={resultValue} onChange={handleChange} />
      <Button
        onClick={handleSubmit}
        isProcessing={isProcessing}
        disabled={isProcessing}
      >
        Güncelle
      </Button>
    </>
  );
}
