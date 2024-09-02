"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Register } from "apicalls/Auth/register";
import { useRouter } from "next/navigation";
import DatePickerComponent from "components/ui/DatePickerComponent";
import Link from "next/link";

export default function RegisterForm() {
  const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$";
  const registerSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    password: z.string().regex(RegExp(regex), {
      message: "Şifre gereksinimlerini karşılamıyor.",
    }),
    gender: z.string().min(1),
    birthDate: z.string().min(1),
  });

  const router = useRouter();

  type Schema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: Schema) {
    try {
      const res = await Register(
        data.email,
        data.password,
        Number(data.gender),
        data.birthDate,
      );
      if (res.success) {
        console.log("REGISTER SUCCESSFUL");
        router.replace("/auth/login");
      } else {
        console.error("REGISTER FAILED");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  return (
    <div>
      <form
        id="authForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
        <>
          {errors.gender?.message && (
            <p>{String(errors.gender.message) + " GENDER"}</p>
          )}
          {errors.birthDate?.message && (
            <p>{String(errors.birthDate.message)}</p>
          )}
        </>
        <div>
          <Input
            id="email"
            type="email"
            label="email"
            placeholder="ahmet@clinic.com"
            {...register("email")}
          />
          {errors.email?.message && <p>{String(errors.email.message)}</p>}
        </div>
        <div>
          <Input
            id="password"
            type="password"
            label="Password"
            {...register("password")}
          />
          {errors.password?.message && <p>{String(errors.password.message)}</p>}
        </div>
        <div>
          <DatePickerComponent {...register("birthDate")} />
        </div>
        <div>
          <Select label="Cinsiyetinizi seçin" {...register("gender")}>
            <SelectItem key={0}>Erkek</SelectItem>
            <SelectItem key={1}>Kadın</SelectItem>
          </Select>
        </div>
        <Button type="submit" color="primary" radius="md">
          <input type="submit" />
        </Button>
        <div>
          <Link href="/auth/login">Giriş yapmak için tıklayın.</Link>
        </div>
      </form>
    </div>
  );
}
