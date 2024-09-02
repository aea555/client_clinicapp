"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import CreateRoleRequest from "apicalls/RoleRequest/CreateRoleRequest";
import { useRouter } from "next/navigation";
import { Alert } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyValuePair } from "types/RoleKeyValuePairs.type";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";

export default function RoleRequestForm() {
  const roles: KeyValuePair[] = [
    { key: "doctor", label: "Doktor" },
    { key: "biochemist", label: "Biyokimyager" },
    { key: "patient", label: "Hasta" },
  ];

  const [alertOpen, setAlertOpen] = useState(false);

  const router = useRouter();

  const requestSchema = z.object({
    Role: z.string(),
    FirstName: z.string().min(1),
    LastName: z.string().min(1),
  });

  type Schema = z.infer<typeof requestSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(requestSchema) });

  const WatchRole = watch("Role");

  async function onSubmit(data: Schema) {
    try {
      const response = await CreateRoleRequest(
        data.Role,
        data.FirstName,
        data.LastName,
        new Date(Date.now()).toISOString(),
      );
      if (response.success) router.replace("/dashboard");
      else setAlertOpen(true);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <>
      <form
        id="roleRequestForm"
        className="flex w-1/2 flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Select label="Profil türü" {...register("Role")}>
            {roles.map((v) => (
              <SelectItem key={v.key}>{v.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Input
            id="firstName"
            type="text"
            label="Ad"
            placeholder=""
            {...register("FirstName")}
          />
          {errors.FirstName?.message && (
            <p>{String(errors.FirstName.message)}</p>
          )}
        </div>
        <div>
          <Input
            id="lastName"
            type="text"
            label="Soyad"
            {...register("LastName")}
          />
          {errors.LastName?.message && <p>{String(errors.LastName.message)}</p>}
        </div>
        <Button type="submit" color="primary" radius="md">
          Submit
        </Button>
        {alertOpen ? (
        <div>
          <Alert
            color="failure"
            className="bg-danger-foreground"
            icon={HiInformationCircle}
            onDismiss={() => setAlertOpen(false)}
          >
            <span className="font-medium">İstek başarısız!</span> Kontrol edip
            tekrar deneyin.
          </Alert>
        </div>
      ) : null}
      </form>
    </>
  );
}
