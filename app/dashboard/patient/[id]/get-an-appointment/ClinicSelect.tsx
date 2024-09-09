"use client";

import { Select } from "flowbite-react";
import React from "react";
import { Clinic } from "types/Clinic.type";
import { PossibleAppointment } from "types/PossibleAppointment.type";
import AppointmentsList from "./AppointmentsList";
import { ServiceResult } from "types/ServiceResult";

type Props = {
  clinics: Clinic[];
};

export default function ClinicSelect({ clinics }: Props) {
  const [selectedClinicId, setSelectedClinicId] = React.useState<string>(
    clinics[0]?.id.toString() || "",
  );
  const [appointments, setAppointments] = React.useState<PossibleAppointment[]>(
    [],
  );
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newId = event.target.value;
    setSelectedClinicId(newId);
  }

  async function listPAs(clinicId: number) {
    try {
      const res = await fetch(`/api/appointment/getpossible/${clinicId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: {
        success: boolean;
        data: ServiceResult<PossibleAppointment[]>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("Appointmens fetch successful");
        setAppointments(data.data.data);
      } else {
        console.log("Appointments fetch failed", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  React.useEffect(() => {
    if (selectedClinicId) {
      setIsProcessing(true);
      listPAs(Number(selectedClinicId));
    }
  }, [selectedClinicId]);

  React.useEffect(() => {
    console.log(appointments);
  }, [appointments]);

  const memoizedAppointments = React.useMemo(
    () => appointments,
    [appointments],
  );

  return (
    <div className="flex flex-col flex-wrap gap-3">
      <div>
        <h5 className="text-lg font-bold">Klinik Seç</h5>
        <Select value={selectedClinicId} onChange={handleChange}>
          {clinics.map((v) => {
            return (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            );
          })}
        </Select>
      </div>
      <AppointmentsList appointments={appointments}/>
    </div>
  );
}
