"use client";

import { Button, Select } from "flowbite-react";
import React from "react";
import { StatusMap } from "utils/mapAppointmentStatus";

interface Props {
  appointmentId: number;
  statusCode: number;
}

export default function AppointmentStatusSelect({
  appointmentId,
  statusCode,
}: Props) {
  const [selectedStatus, setSelectedStatus] =
    React.useState<number>(statusCode);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = Number(event.target.value);
    setSelectedStatus(newStatus);
  }

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/updateAppointment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointmentId, status:selectedStatus }),
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
      <Select id="randevudurum" value={selectedStatus} onChange={handleChange}>
        {Object.entries(StatusMap).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Select>
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
