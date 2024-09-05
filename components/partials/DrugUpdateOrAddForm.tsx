"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function DrugUpdateOrAddForm() {
  const [formMode, setFormMode] = React.useState<string>("add");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  function handleChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setFormMode(event.target.value);
  }

  const updateSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1).max(256).optional(),
  });

  const createSchema = z.object({
    name: z.string().min(1).max(256),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;
  type CreateSchema = z.infer<typeof createSchema>;

  const { register: registerPost, handleSubmit: handleSubmitPost } =
    useForm<CreateSchema>({
      resolver: zodResolver(createSchema),
    });

  const { register: registerPut, handleSubmit: handleSubmitPut } =
    useForm<UpdateSchema>({
      resolver: zodResolver(updateSchema),
    });

  async function onSubmitPost(schemaData: CreateSchema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/createDrug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: schemaData.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Drug create successful");
        window.location.reload();
      } else {
        console.log("Drug create failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  async function onSubmitPut(schemaData: UpdateSchema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/updateDrug", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(schemaData.id),
          name: schemaData.name,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Drug update successful");
        window.location.reload();
      } else {
        console.log("Drug update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <form
      onSubmit={
        formMode === "add"
          ? handleSubmitPost(onSubmitPost)
          : handleSubmitPut(onSubmitPut)
      }
      className="flex flex-col gap-4 rounded-md border-3 border-zinc-600 bg-zinc-300 p-6 shadow-2xl drop-shadow-2xl"
    >
      <fieldset className="flex max-w-md flex-col gap-4">
        <legend className="mb-4">
          <span className="text-lg font-bold">İşlem Seçin</span>
        </legend>
        <div className="flex items-center gap-2">
          <Radio
            onChange={handleChangeRadio}
            checked={formMode === "add"}
            id="eklei"
            name="islemsecenektahlil"
            value="add"
          />
          <Label htmlFor="eklei">İlaç Ekle</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="guncellei"
            name="islemsecenekilac"
            value="update"
            checked={formMode === "update"}
            onChange={handleChangeRadio}
          />
          <Label htmlFor="guncellei">İlaç Güncelle</Label>
        </div>
      </fieldset>
      <div>
        {formMode === "update" ? (
          <div className="mb-2 block">
            <Label className="block" htmlFor="ilacid" value="İlaç Id" />
            <TextInput
              id="ilacid"
              type="number"
              {...registerPut("id")}
              required
              shadow
            />
          </div>
        ) : null}
        <div className="mb-2 block">
          <Label className="block" htmlFor="ilac" value="İlaç Adı" />
          {formMode === "update" ? (
            <div>
              <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
              <TextInput
                id="ilacad"
                type="text"
                {...registerPut("name")} 
                shadow
              />
            </div>
          ) : (
            <TextInput
              id="ilacad"
              type="text"
              required
              {...registerPost("name")}
              shadow
            />
          )}
        </div>
      </div>
      <Button isProcessing={isProcessing} disabled={isProcessing} type="submit">
        Gönder
      </Button>
    </form>
  );
}
