"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  id: number;
  patientId?: null | string;
  doctorId?: null | string;
  drugId?: null | string;
}

export default function InjectionFieldUpdate({
  id,
  patientId,
  doctorId,
  drugId,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const updateSchema = z.object({
    patientId: z
      .number()
      .transform((val) => (val ? Number(val) : null))
      .optional()
      .nullable(),
    doctorId: z
      .number()
      .transform((val) => (val ? Number(val) : null))
      .optional()
      .nullable(),
    drugId: z
      .number()
      .transform((val) => (val ? Number(val) : null))
      .optional()
      .nullable(),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;

  const {
    register: registerPut,
    handleSubmit: handleSubmitPut,
    formState: { errors: errorPut },
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  async function onSubmit(schemaData: UpdateSchema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/injection/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          patientId: schemaData.patientId,
          doctorId: schemaData.doctorId,
          drugId: schemaData.drugId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Injection update successful");
        window.location.reload();
      } else {
        console.log("Injection update failed", data.error || "Unknown error", schemaData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  const renderAllErrors = Object.values(errorPut)
    .filter(Boolean)
    .map((error) => error?.message)
    .join("\n");

  return (
    <form onSubmit={handleSubmitPut(onSubmit)}>
      {renderAllErrors && (
        <div style={{ color: "red", whiteSpace: "pre-line" }}>
          <h4>Errors:</h4>
          <p>{renderAllErrors}</p>
        </div>
      )}
      {patientId !== undefined && (
        <>
          <TextInput
            className="block"
            defaultValue={patientId ?? ""}
            type="number"
            {...registerPut("patientId", { valueAsNumber: true })}
          />
          <Button
            isProcessing={isProcessing}
            disabled={isProcessing}
            className="mt-2"
            type="submit"
          >
            Güncelle
          </Button>
        </>
      )}
      {doctorId !== undefined && (
        <>
          <TextInput
            className="block"
            defaultValue={doctorId ?? ""}
            type="number"
            {...registerPut("doctorId", { valueAsNumber: true })}
          />
          <Button
            isProcessing={isProcessing}
            disabled={isProcessing}
            className="mt-2"
            type="submit"
          >
            Güncelle
          </Button>
        </>
      )}
      {drugId !== undefined && (
        <>
          <TextInput
            className="block"
            defaultValue={drugId ?? ""}
            type="number"
            {...registerPut("drugId", { valueAsNumber: true })}
          />
          <Button
            isProcessing={isProcessing}
            disabled={isProcessing}
            className="mt-2"
            type="submit"
          >
            Güncelle
          </Button>
        </>
      )}
    </form>
  );
}
