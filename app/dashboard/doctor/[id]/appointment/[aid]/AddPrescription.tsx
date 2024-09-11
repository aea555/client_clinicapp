"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dropdown, Spinner, TextInput } from "flowbite-react";
import React, { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegTrashAlt } from "react-icons/fa";
import { Drug } from "types/Drug.type";
import { Prescription } from "types/Prescription.type";
import { ServiceResult } from "types/ServiceResult";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

interface Props {
  appointmentId: number;
  patientId: number;
  doctorId: number;
}

export default function AddPrescription({
  appointmentId,
  patientId,
  doctorId,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [drugs, setDrugs] = React.useState<Drug[]>([]);
  const [selectedDrugs, setSelectedDrugs] = React.useState<Drug[] | null>([]);

  useEffect(() => {
    fetchStuff();
  }, []);

  async function fetchStuff() {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/drug/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: {
        success: boolean;
        data: ServiceResult<Drug[]>;
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("Fetch successful");
        setDrugs(data.data.data);
      } else {
        console.log("Fetch failed", data.data.errorMessage || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function createPrescription(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/prescription/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          patientId,
          doctorId,
          durationDays: schemaData.durationDays
        }),
      });

      const data: {
        success: boolean;
        data: ServiceResult<Prescription>
        error: string | undefined | null;
      } = await res.json();

      if (data.success && data.data.data) {
        console.log("create successful");
        selectedDrugs?.forEach(async (d) => {
          const res = await fetch("/api/prescriptiondrug/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prescriptionId: data.data.data?.id,
              drugId: d.id
            }),
          });
          const resData: {
            success: boolean;
            error: string | undefined | null;
          } = await res.json();
          if (resData.success){
            console.log("create prescriptiondrug successful");
          } else {
            console.error("create prescription drug failed.")
          }
        })
        window.location.reload();
      } else {
        console.log("create failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  function handleClick(drug: Drug) {
    if (selectedDrugs && !selectedDrugs?.includes(drug)) {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
  }

  function handleDelete(drug: Drug) {
    if (selectedDrugs && selectedDrugs.includes(drug)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d !== drug));
    }
  }

  const schema = z.object({
    durationDays: z
      .number()
      .min(1)
      .transform((val) => (val ? Number(val) : null)),
  });

  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: {errors: postErrors},
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

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
          <h5 className="text-lg font-medium">Reçete</h5>
          <Dropdown label="İlaç Ekle" inline>
            {drugs &&
              drugs.length > 0 &&
              drugs.map((v) => {
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
        <div className="flex flex-col -mt-3 gap-3 rounded-b-md border-2 border-content2 bg-white p-3">
          {selectedDrugs &&
            selectedDrugs.length > 0 &&
            selectedDrugs.map((v) => (
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
        <form className="mt-3 flex flex-col flex-wrap gap-3" onSubmit={handleSubmit(createPrescription)}>
          <div className="md:w-1/2">
            <h5>Reçete Süresi</h5>
            <TextInput {...register("durationDays", {valueAsNumber: true})} type="number" className="mt-1" />
          </div>

          <Button isProcessing={isProcessing} disabled={isProcessing} type="submit" className="mt-3">Reçete Oluştur</Button>
        </form>
      </div>
    </Suspense>
  );
}
