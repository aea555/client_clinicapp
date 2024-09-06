"use client"

import { Button, Select } from 'flowbite-react';
import React from 'react'
import { ResultFlags } from 'utils/mapResultFlagToString';

interface Props {
  id: number;
  biochemistId: number;
  appointmentTestId: number;
  resultFlag: number;
}

interface Props {
  id: number;
  biochemistId: number;
  appointmentTestId: number;
  resultFlag: number;
}

export default function ResultFlagUpdate({
  id,
  biochemistId,
  appointmentTestId,
  resultFlag,
}: Props) {
  const [selectedStatus, setSelectedStatus] =
    React.useState<number>(resultFlag);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = Number(event.target.value);
    setSelectedStatus(newStatus);
  }

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/testresults/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, biochemistId, appointmentTestId, resultFlag: selectedStatus }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Test result update successful");
        window.location.reload();
      } else {
        console.log("Test result update failed", (`Error: ${data.error} StatusCode: ${data.statusCode}`) || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Select value={selectedStatus} onChange={handleChange}>
        {Object.entries(ResultFlags).map(([key, value]) => (
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
  )
}
