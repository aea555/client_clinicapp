"use client";

import { Button, Dropdown, Spinner, TextInput } from "flowbite-react";
import React, { Suspense, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { ServiceResult } from "types/ServiceResult";
import { Test } from "types/Test.type";
import { v4 as uuidv4 } from "uuid";

interface Props {
  appointmentId: number;
}

export default function AddTest({ appointmentId}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [tests, setTests] = React.useState<Test[]>([]);
  const [selectedTests, setSelectedTests] = React.useState<Test[] | null>([]);

  useEffect(() => {
    fetchStuff();
  }, []);

  async function fetchStuff() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/test/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: {
        success: boolean;
        data: ServiceResult<Test[]>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("Fetch successful");
        setTests(data.data.data);
      } else {
        console.log("Fetch failed", data.data.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function createAppointmentTests() {
    setIsProcessing(true);
    try {
      selectedTests && selectedTests?.length > 0 && selectedTests?.forEach(async (t) => {
        const res = await fetch("/api/appointmenttest/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            testId: t.id
          }),
        });

        const data: {
          success: boolean;
          error: string | undefined | null;
        } = await res.json();

        if (data.success) {
          console.log("create successful");
        } else {
          console.log("create failed", data.error || JSON.stringify({
            appointmentId,
            testId: t.id
          }),);
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleClick(test: Test) {
    if (selectedTests && !selectedTests?.includes(test)) {
      setSelectedTests([...selectedTests, test]);
    }
  }

  function handleDelete(test: Test) {
    if (selectedTests && selectedTests.includes(test)) {
      setSelectedTests(selectedTests.filter((d) => d !== test));
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
      <div className="flex flex-col flex-wrap gap-3 p-3 drop-shadow-2xl shadow-2xl">
        <div className="rounded-t-md bg-content2 p-3">
          <h5 className="text-lg font-medium">Tahlil</h5>
          <Dropdown label="Tahlil Ekle" inline>
            {tests &&
              tests.length > 0 &&
              tests.map((v) => {
                return (
                  <Dropdown.Item
                    className="hover:cursor-pointer"
                    value={v.name}
                    onClick={() => handleClick(v)}
                    key={uuidv4()}
                  >
                    {v.name}
                  </Dropdown.Item>
                );
              })}
          </Dropdown>
        </div>
        <div className="flex flex-col gap-3 rounded-b-md border-2 border-content2 bg-white p-3 -mt-3">
          {selectedTests &&
            selectedTests.length > 0 &&
            selectedTests.map((v) => (
              <div
                key={uuidv4()}
                className="flex flex-row justify-between rounded-md p-2 hover:bg-content2"
              >
                <p className="font-semibold">{v.name}</p>
                <FaRegTrashAlt
                  onClick={() => handleDelete(v)}
                  className="my-auto text-red-600 hover:cursor-pointer hover:opacity-85"
                />
              </div>
            ))}
        </div>
        <div
          className="mt-3 flex flex-col flex-wrap gap-3"
        >
          <Button
            isProcessing={isProcessing}
            disabled={isProcessing}
            className="mt-3"
            onClick={createAppointmentTests}
          >
            Tahlil Ekle
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
