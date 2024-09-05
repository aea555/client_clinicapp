"use client";

import { Button, Textarea } from "flowbite-react";
import React from "react";

interface Props {
  appointmentId: Number | string;
  notes: string | null;
}

export default function AppointmentNotesUpdate({
  appointmentId,
  notes,
}: Props) {
  const [noteText, setNoteText] = React.useState<string>(notes || "");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);


  async function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target.value;
    setNoteText(newText);
  }

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/updateAppointment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, notes: noteText}),
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
      <Textarea className="p-2" value={noteText} onChange={handleChange} />
      <Button onClick={handleSubmit} isProcessing={isProcessing} disabled={isProcessing}>
        Güncelle
      </Button>
    </>
  );
}
