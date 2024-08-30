'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "@nextui-org/react";
import { Login } from "calls/Auth/login";
import { Register } from "calls/Auth/register";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$";

  const authSchema = z.object({
    email: z.string().email({ message: "Geçerli bir email giriniz." }),
    password: z.string().regex(RegExp(regex), { message: "Şifre gereksinimlerini karşılamıyor." }),
  });

  type Schema = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(authSchema) });

  const onSubmit = async (data: Schema) => {
    try {
      if (isLogin) {
        const res = await Login(data.email, data.password);
        if (res.success) {
          console.log("TOKEN: " + res.data);
        } else {
          console.error("LOGIN FAILED");
        }
      } else {
        const res = await Register(data.email, data.password);
        if (res.success) {
          console.log("REGISTER SUCCESSFUL");
        } else {
          console.error("REGISTER FAILED");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Submit
        </Button>
      </form>
    </div>
  );
}