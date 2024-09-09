"use client";

import { Button, List, Spinner } from "flowbite-react";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { PossibleAppointment } from "types/PossibleAppointment.type";

interface Props {
  appointment: PossibleAppointment;
}

export default function AppointmentCard({ appointment }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[3];

  async function handlePress() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/createwithaccountid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clinicId: appointment.clinicId,
          doctorId: appointment.doctorId,
          accountId: id,
          startTime: appointment.startTime,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Appointment CREATE successful");
        window.location.reload();
      } else {
        console.log(
          "Appointment CREATE failed",
          JSON.stringify({
            clinicId: appointment.clinicId,
            doctorId: appointment.doctorId,
            accountId: id,
            startTime: appointment.startTime,
          }),
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex flex-col gap-5 rounded-xl bg-white p-3">
        <List.Item icon={FaUserDoctor}>
          <p className="font-bold">
            {appointment.doctorFirstName} {appointment.doctorLastName}
          </p>
        </List.Item>
        <Button onClick={handlePress} isProcessing={isProcessing}>
          Randevu Al
        </Button>
      </div>
    </Suspense>
  );
}
