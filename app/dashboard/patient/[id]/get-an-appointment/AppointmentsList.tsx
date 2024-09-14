"use client";

import React, { Suspense, useEffect } from "react";
import { PossibleAppointment } from "types/PossibleAppointment.type";
import AppointmentCard from "./AppointmentCard";
import { Select, Spinner } from "flowbite-react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  appointments: PossibleAppointment[];
}

export default function AppointmentsList({ appointments }: Props) {
  function groupAppointmentsByTime(appointments: PossibleAppointment[]) {
    return appointments.reduce(
      (acc, appointment) => {
        const startTime = new Date(appointment.startTime).toLocaleTimeString();
        if (!acc[startTime]) {
          acc[startTime] = [];
        }
        acc[startTime].push(appointment);
        return acc;
      },
      {} as Record<string, PossibleAppointment[]>,
    );
  }

  const groupedAppointments = groupAppointmentsByTime(appointments);
  const startTimes = Object.keys(groupedAppointments);
  const [selectedStartTime, setSelectedStartTime] = React.useState<string>(
    startTimes[0] || "",
  );
  const [appointmentsOfTime, setAppointmentsOfTime] = React.useState<
    PossibleAppointment[]
  >([]);

  useEffect(() => {
    if (startTimes.length > 0 && !selectedStartTime) {
      const initialTime = startTimes[0] || "";
      setSelectedStartTime(initialTime);
      setAppointmentsOfTime(groupedAppointments[initialTime] || []);
    }
  }, [startTimes]);

  useEffect(() => {
    setAppointmentsOfTime(groupedAppointments[selectedStartTime] || []);
  }, [selectedStartTime]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(event.target.value);
  };

  //const filteredAppointments = groupedAppointments[selectedStartTime];

  return (
    <>
      <Suspense
        fallback={
          <div className="text-center">
            <Spinner size="xl" aria-label="Loading" />
          </div>
        }
      >
        {appointmentsOfTime.length === 0 ? (
          <div className="text-center mt-6 font-bold text-red-500">
            <p>Bu klinik şu anda kapalı ya da boşta hiç randevu yok.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <h5 className="text-lg font-bold">Saat Seçin</h5>
              <Select
                value={selectedStartTime}
                onChange={handleSelectChange}
                className="form-select"
              >
                {startTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col gap-6 rounded-xl p-4 shadow-2xl drop-shadow-2xl">
              <span className="text-2xl font-bold">Randevular</span>
              <div className="grid gap-6 p-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                {appointmentsOfTime ? (
                  appointmentsOfTime.map((appointment) => (
                    <AppointmentCard key={uuidv4()} appointment={appointment} />
                  ))
                ) : (
                  <p>Bu saatte boş randevu bulunamadı.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </>
  );
}
