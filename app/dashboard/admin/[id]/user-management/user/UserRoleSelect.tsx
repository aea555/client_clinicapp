"use client";

import { Button, Select } from "flowbite-react";
import React from "react";
import { RoleFlags } from "utils/mapUserRoleToString";


interface Props {
  accountId: number;
  roleFlag: number;
}

export default function UserRoleSelect({
  accountId,
  roleFlag,
}: Props) {
  const [selectedStatus, setSelectedStatus] =
    React.useState<number>(roleFlag);
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = Number(event.target.value);
    setSelectedStatus(newStatus);
  }

  async function handleSubmit() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/account/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: accountId, role: roleFlag }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Account update successful");
        window.location.reload();
      } else {
        console.log("Account update failed", data.error || "Unknown error");
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
        {Object.entries(RoleFlags).map(([key, value]) => (
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
