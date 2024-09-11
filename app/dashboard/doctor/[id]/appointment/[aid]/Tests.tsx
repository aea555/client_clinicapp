"use client";

import { Dropdown, Spinner } from "flowbite-react";
import React, { Suspense, useEffect } from "react";
import { AppointmentScreenResults } from "types/AppointmentScreenResults.type";
import { ServiceResult } from "types/ServiceResult";
import { mapResultFlagToSpan } from "utils/mapResultFlagToString";
import { v4 as uuidv4 } from "uuid";

interface Props {
  appointmentId: number;
}

export default function Tests({ appointmentId }: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [testResults, setTestResults] = React.useState<
    AppointmentScreenResults[]
  >([]);

  async function fetchStuff() {
    setIsProcessing(true);
    try {
      const res = await fetch(
        `/api/test/gettestsofappointment/${appointmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data: {
        success: boolean;
        data: ServiceResult<AppointmentScreenResults[]>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.extraData) {
        console.log("Fetch successful");
        setTestResults(data.data.extraData);
      } else {
        console.log("Fetch failed", data.data.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  useEffect(() => {
    fetchStuff();
  }, []);

  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
        <div className="flex flex-col flex-wrap gap-3 p-3 drop-shadow-2xl shadow-2xl">
          <div className="rounded-md bg-content2">
            <h5 className="p-3 text-lg font-medium">Tahlil Sonuçları</h5>
            <div className="flex flex-col gap-3 border-2 border-content2 bg-white p-3">
              {testResults &&
                testResults.length > 0 &&
                testResults.map((v, idx) => {
                  return (
                    <p
                      key={uuidv4()}
                      className="rounded-md p-1 hover:bg-content2"
                    >
                      {v.testName} -{" "}
                      {`${v.appointmentTestResults[idx]?.value !== undefined ? v.appointmentTestResults[idx]?.value : ""} ${v.appointmentTestResults[idx]?.value !== undefined ? v?.unitType : ""}`}{" "}
                      {mapResultFlagToSpan(
                        Number(v.appointmentTestResults[idx]?.resultFlag),
                      )}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
    </Suspense>
  );
}
