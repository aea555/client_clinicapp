"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "flowbite-react";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";

interface Props {
  appointmentTestId: number;
  rangeStart: number | null | undefined;
  rangeEnd: number | null | undefined;
}

export default function SendResults({
  appointmentTestId,
  rangeStart,
  rangeEnd,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const id = pathSegments[3];

  const schema = z.object({
    value: z
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

  async function handlePress(schemaData: Schema) {
    setIsProcessing(true);
    const resultFlag = (rangeEnd && rangeStart && schemaData.value ? (schemaData.value > rangeEnd ? 2 : (schemaData.value < rangeEnd ? 1 : 0)) : 0);
    try {
      const res = await fetch("/api/testresults/createwithaccountid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentTestId,
          value: schemaData.value,
          accountId: id,
          resultFlag
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Test result create successful");
        window.location.reload();
      } else {
        console.log("Test result create failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }
  return (
    <form className="flex flex-col flex-wrap gap-3" onSubmit={handleSubmit(handlePress)}>
      <TextInput {...register("value", {valueAsNumber: true})} type="number" sizing="sm" />
      <Button
        isProcessing={isProcessing}
        disabled={isProcessing}
        type="submit"
      >
        Gönder
      </Button>
    </form>
  );
}
