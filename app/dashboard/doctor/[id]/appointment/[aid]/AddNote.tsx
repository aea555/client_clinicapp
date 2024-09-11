"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Textarea } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  appointmentId: number,
  existingNotes?: string | null
}

export default function AddNote({existingNotes, appointmentId} : Props) {
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  const schema = z.object({
    notes: z
      .string()
      .max(500)
      .optional()
  });

  type Schema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: {errors: postErrors},
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  async function updateNotes(schemaData: Schema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/appointment/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId,
          notes: schemaData.notes
        }),
      });

      const data: {
        success: boolean;
        error: string | undefined | null;
      } = await res.json();

      if (data.success) {
        console.log("update successful");
      } else {
        console.log("update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div id="first-col-of-2ndrow-notlar" className="flex flex-col flex-wrap gap-3 p-3 drop-shadow-2xl shadow-2xl">
      <form className="rounded-md" onSubmit={handleSubmit(updateNotes)}>
        <h5 className="p-3 rounded-t-md text-lg bg-content2 font-medium">Notlar</h5>
        <Textarea {...register("notes")} defaultValue={existingNotes || ""} className="p-2 rounded-none rounded-b-md" placeholder="...Notlar" rows={3} />
        <Button className="mt-2" isProcessing={isProcessing} disabled={isProcessing} type="submit">Gönder</Button>
      </form>
    </div>
  );
}
