"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Button,
  Input,
} from "@nextui-org/react";
import { Login } from "apicalls/Auth/login";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const authSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    password: z.string()
  });

  const router = useRouter();

  type Schema = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(authSchema) });

  async function onSubmit(data: Schema) {
    try {
      const res = await Login(data.email, data.password);
        if (res.success) {
          console.log("LOGIN SUCCESSFUL");
          router.replace("/dashboard");
        } else {
          console.error("LOGIN FAILED");
        }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div>
      <form
        id="authForm"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
      >
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
        <Button type="submit" color="primary" radius="md">
          <input type="submit" />
        </Button>
        <div>
          <Link href="/auth/register">Kayıt olmak için tıklayın.</Link>
        </div>
      </form>
    </div>
  );
}
