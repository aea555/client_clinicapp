"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function TestUpdateOrAddForm() {
  const [formMode, setFormMode] = React.useState<string>("add");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);

  function handleChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setFormMode(event.target.value);
  }

  const updateSchema = z.object({
    id: z.string().min(1),
    name: z.string().optional(),
    unitType: z.string().optional(),
    rangeStartMale: z.string().max(100).optional(),
    rangeEndMale: z.string().max(100).optional(),
    rangeStartFemale: z.string().max(100).optional(),
    rangeEndFemale: z.string().max(100).optional(),
    desc: z.string().optional(),
  });

  const createSchema = z.object({
    name: z.string(),
    unitType: z.string(),
    rangeStartMale: z.string().min(1).max(100),
    rangeEndMale: z.string().min(1).max(100),
    rangeStartFemale: z.string().min(1).max(100),
    rangeEndFemale: z.string().min(1).max(100),
    desc: z.string().optional(),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;
  type CreateSchema = z.infer<typeof createSchema>;

  const {
    register: registerPost,
    handleSubmit: handleSubmitPost,
    formState: formStatePost,
  } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
  });

  const {
    register: registerPut,
    handleSubmit: handleSubmitPut,
    formState: formStatePut,
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  async function onSubmitPost(schemaData: CreateSchema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/test/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: schemaData.name,
          unitType: schemaData.unitType,
          rangeStartMale: Number(schemaData.rangeStartMale),
          rangeEndMale: Number(schemaData.rangeEndMale),
          rangeStartFemale: Number(schemaData.rangeStartFemale),
          rangeEndFemale: Number(schemaData.rangeEndFemale),
          desc: schemaData.desc,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Test create successful");
        window.location.reload();
      } else {
        console.log("Test create failed", data.error || "Unknown error");
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
      const res = await fetch("/api/test/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(schemaData.id),
          name: schemaData.name,
          unitType: schemaData.unitType,
          rangeStartMale: Number(schemaData.rangeStartMale),
          rangeEndMale: Number(schemaData.rangeEndMale),
          rangeStartFemale: Number(schemaData.rangeStartFemale),
          rangeEndFemale: Number(schemaData.rangeEndFemale),
          desc: schemaData.desc,
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Test update successful");
        window.location.reload();
      } else {
        console.log("Test update failed", data.error || "Unknown error");
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
            id="eklet"
            name="islemsecenektahlil"
            value="add"
            onChange={handleChangeRadio}
            checked={formMode === "add"}
          />
          <Label htmlFor="eklet">Tahlil Birimi Ekle</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="guncellet"
            name="islemsecenektahlil"
            value="update"
            checked={formMode === "update"}
            onChange={handleChangeRadio}
          />
          <Label htmlFor="guncellet">Tahlil Birimi Güncelle</Label>
        </div>
      </fieldset>
      <div className="flex flex-col gap-3">
        {formMode === "update" ? (
          <div className="mb-2 block">
            <Label htmlFor="tahlilid" value="Tahlil Id" />
            <TextInput
              {...registerPut("id")}
              id="tahlilid"
              type="number"
              required
              shadow
            />
          </div>
        ) : null}
        <div className="flex flex-row flex-wrap gap-3">
          <div>
            <div className="mb-2 block">
              <Label className="block" htmlFor="tahlilad" value="Tahlil Adı" />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="tahlilad"
                    type="text"
                    {...registerPut("name")} // Conditionally apply register
                    shadow
                  />
                </div>
              ) : (
                <TextInput
                  id="tahlilad"
                  type="text"
                  required
                  {...registerPost("name")}
                  shadow
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label className="block" htmlFor="birim" value="Ölçek Tipi" />
              {formMode === "update" ? (
                <div>
                  <TextInput
                    id="birim"
                    type="text"
                    shadow
                    {...registerPut("unitType")}
                  />
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                </div>
              ) : (
                <TextInput
                  id="birim"
                  type="text"
                  required
                  shadow
                  {...registerPost("unitType")}
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirerkek"
                value="Alt Normal Sınır (Erkek)"
              />
              {formMode === "update" ? (
                <div>
                  <TextInput
                    id="altsinirerkek"
                    type="text"
                    shadow
                    {...registerPost("rangeStartMale")}
                    {...registerPut("rangeStartMale")}
                  />
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                </div>
              ) : (
                <TextInput
                  id="altsinirerkek"
                  type="text"
                  required
                  shadow
                  {...registerPost("rangeStartMale")}
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="ustsinirerkek"
                value="Üst Normal Sınır (Erkek)"
              />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="ustsinirerkek"
                    type="text"
                    shadow
                    {...registerPut("rangeEndMale")}
                  />
                </div>
              ) : (
                <TextInput
                  id="ustsinirerkek"
                  type="text"
                  required
                  shadow
                  {...registerPost("rangeEndMale")}
                />
              )}
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirkadin"
                value="Alt Normal Sınır (Kadın)"
              />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="altsinirkadin"
                    type="text"
                    shadow
                    {...registerPut("rangeStartFemale")}
                  />
                </div>
              ) : (
                <TextInput
                  id="altsinirkadin"
                  type="text"
                  required
                  shadow
                  {...registerPost("rangeStartFemale")}
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="ustsinirkadin"
                value="Üst Normal Sınır (Kadın)"
              />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="ustsinirkadin"
                    type="text"
                    shadow
                    {...registerPut("rangeEndFemale")}
                  />
                </div>
              ) : (
                <TextInput
                  id="ustsinirkadin"
                  type="text"
                  required
                  shadow
                  {...registerPost("rangeEndFemale")}
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="desc"
                value="Açıklama (Opsiyonel)"
              />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    {...registerPut("desc")}
                    id="desc"
                    type="text"
                    shadow
                  />
                </div>
              ) : (
                <TextInput
                  {...registerPost("desc")}
                  id="desc"
                  type="text"
                  shadow
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Button isProcessing={isProcessing} disabled={isProcessing} type="submit">
        Gönder
      </Button>
    </form>
  );
}
