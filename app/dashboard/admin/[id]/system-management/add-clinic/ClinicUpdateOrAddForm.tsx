"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { parseZonedDateTime, Time, parseTime } from "@internationalized/date";
import { TimeInput } from "@nextui-org/react";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ClinicUpdateOrAddForm() {
  const [formMode, setFormMode] = React.useState<string>("add");
  const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
  const [openTime, setOpenTime] = React.useState<string>("09:00");
  const [closeTime, setCloseTime] = React.useState<string>("16:00");
  const [breakStartTime, setBreakStartTime] = React.useState<string>("12:30");
  const [breakEndTime, setBreakEndTime] = React.useState<string>("13:30");

  function handleChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    setFormMode(event.target.value);
  }

  const updateSchema = z.object({
    id: z
      .number()
      .min(1)
      .transform((val) => (val ? Number(val) : null)),
    name: z.string().optional().nullable(),
    address: z.string().max(100).optional().nullable(),
  });

  function handleTimeChange(value: Time, to: string) {
    const formattedTime = `${value?.hour.toString().padStart(2, "0")}:${value?.minute
      .toString()
      .padStart(2, "0")}`;
    console.log(formattedTime)

    switch (to) {
      case "openTime":
        setOpenTime(formattedTime);
        break;
      case "closeTime":
        setCloseTime(formattedTime);
        break;
      case "breakStartTime":
        setBreakStartTime(formattedTime);
        break;
      case "breakEndTime":
        setBreakEndTime(formattedTime);
        break;
      default:
        break;
    }
  }

  const createSchema = z.object({
    name: z.string().max(100),
    address: z.string().max(500),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;
  type CreateSchema = z.infer<typeof createSchema>;

  const {
    register: registerPost,
    handleSubmit: handleSubmitPost,
    formState: {errors: postErrors},
  } = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
  });

  const {
    register: registerPut,
    handleSubmit: handleSubmitPut,
    formState: {errors: putErrors},
  } = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
  });

  async function onSubmitPost(schemaData: CreateSchema) {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/clinic/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: schemaData.name,
          address: schemaData.address,
          openTime: openTime + ":00",
          closeTime: closeTime + ":00",
          breakStartTime: breakStartTime + ":00",
          breakEndTime: breakEndTime + ":00",
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Clinic create successful");
        window.location.reload();
      } else {
        console.log("Clinic create failed", data.error || "Unknown error");
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
      const res = await fetch("/api/clinic/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(schemaData.id),
          name: schemaData.name,
          address: schemaData.address,
          openTime: openTime + ":00",
          closeTime: closeTime + ":00",
          breakStartTime: breakStartTime + ":00",
          breakEndTime: breakEndTime + ":00",
        }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("Clinic update successful");
        window.location.reload();
      } else {
        console.log("Clinic update failed", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
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
          <Label htmlFor="eklet">Klinik Ekle</Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio
            id="guncellet"
            name="islemsecenektahlil"
            value="update"
            checked={formMode === "update"}
            onChange={handleChangeRadio}
          />
          <Label htmlFor="guncellet">Klinik Güncelle</Label>
        </div>
      </fieldset>
      <div className="flex flex-col gap-3">
        {formMode === "update" ? (
          <div className="mb-2 block">
            <Label htmlFor="tahlilid" value="Klinik Id" />
            <TextInput
              {...registerPut("id", { valueAsNumber: true })}
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
              <Label className="block" htmlFor="tahlilad" value="Klinik Adı" />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="tahlilad"
                    type="text"
                    {...registerPut("name")}
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
              <Label className="block" htmlFor="birim" value="Adres" />
              {formMode === "update" ? (
                <div>
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                  <TextInput
                    id="birim"
                    type="text"
                    shadow
                    {...registerPut("address")}
                  />
                </div>
              ) : (
                <TextInput
                  id="birim"
                  type="text"
                  required
                  shadow
                  {...registerPost("address")}
                />
              )}
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirerkek"
                value="Açılış Saati"
              />
              <div>
                {formMode === "update" ? (
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                ) : null}

                <TimeInput
                  onChange={(v) => handleTimeChange(v, "openTime")}
                  className="rounded-none"
                  hourCycle={24}
                  hideTimeZone
                  defaultValue={new Time(9, 0)}
                  label={null}
                  aria-label="Açılış Saati"
                />
              </div>
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirerkek"
                value="Kapanış Saati"
              />
              <div>
                {formMode === "update" ? (
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                ) : null}

                <TimeInput
                  onChange={(v) => handleTimeChange(v, "closeTime")}
                  className="rounded-none"
                  hourCycle={24}
                  hideTimeZone
                  defaultValue={new Time(16, 30)}
                  label={null}
                  aria-label="Kapanış Saati"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirerkek"
                value="Paydos Başlangıç Saati"
              />
              <div>
                {formMode === "update" ? (
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                ) : null}

                <TimeInput
                  onChange={(v) => handleTimeChange(v, "breakStartTime")}
                  className="rounded-none"
                  hourCycle={24}
                  hideTimeZone
                  defaultValue={new Time(12, 30)}
                  label={null}
                  aria-label="Paydos Başlangıç Saati"
                />
              </div>
            </div>
            <div className="mb-2 block">
              <Label
                className="block"
                htmlFor="altsinirerkek"
                value="Paydos Bitiş Saati"
              />
              <div> 
                {formMode === "update" ? (
                  <span className="text-sm font-medium">{"(Opsiyonel)"}</span>
                ) : null}

                <TimeInput
                  onChange={(v) => handleTimeChange(v, "breakEndTime")}
                  className="rounded-none"
                  hourCycle={24}
                  hideTimeZone
                  defaultValue={new Time(13, 30)}
                  label={null}
                  aria-label="Paydos Bitiş Saati"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button isProcessing={isProcessing} disabled={isProcessing} type="submit">
        Gönder
      </Button>
    </form>
    </>
  );
}
