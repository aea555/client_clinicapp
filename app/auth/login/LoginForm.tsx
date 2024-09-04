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
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

export default function LoginForm() {
  const [submitFail, setSubmitFail] = React.useState<boolean>(false);
  const [submitOkay, setSubmitOkay] = React.useState<boolean>(false);

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
          setSubmitOkay(true);
          router.replace("/dashboard");
        } else {
          setSubmitFail(true);
        }
    } catch (error) {
      setSubmitFail(true);
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
        <div>
          {submitFail ? (
            <Alert
              color="failure"
              icon={HiInformationCircle}
              onDismiss={() => setSubmitFail(false)}
            >
              <span className="font-medium">İşlem Başarısız! </span>
              Lütfen tekrar deneyin.
            </Alert>
          ) : null}
          {submitOkay ? (
            <Alert color="success">
              <span className="font-medium">İşlem Başarılı! </span>
              Lütfen sayfanız yüklenirken bekleyin...
            </Alert>
          ) : null}
        </div>
      </form>
    </div>
  );
}
