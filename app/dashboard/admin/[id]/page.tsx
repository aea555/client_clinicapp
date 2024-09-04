import { Spinner } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { CustomJwtPayload } from "types/Jwt.type";

export default function AdminPage() {
  const token = cookies().get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token?.value || "");
  const userId = decoded.nameid;
  
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
    <div className="flex w-full flex-col p-6">
      <div className="w-full p-4">
        <h3 className="font-bold pb-6 text-2xl">Yönetim Paneli</h3>
        <div id="menubuttonsadmin" className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 rounded-2xl border-5 border-zinc-600 shadow-lg bg-zinc-300 p-6">
            <h5 className="font-bold text-lg">Kayıt Başvuruları</h5>
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                href={`/dashboard/admin/${userId}/role-request/biochemist`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-3 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Biyokimyager Kayıt Başvuruları
                </h5>
              </Link>
              <Link
                href={`/dashboard/admin/${userId}/role-request/doctor`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-3 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Doktor Kayıt Başvuruları
                </h5>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border-5 border-zinc-600 shadow-lg bg-zinc-300 p-6">
            <h5 className="font-bold text-lg">Randevu, Tahlil ve Enjeksiyonlar</h5>
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                href={`/dashboard/admin/${userId}/appointment-management/appointments`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Tüm Randevular
                </h5>
              </Link>
              <Link
                href={`/dashboard/admin/${userId}/appointment-management/tests`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Tüm Tahliller
                </h5>
              </Link>
              <Link
                href={`/dashboard/admin/${userId}/appointment-management/injections`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Tüm Enjeksiyonlar
                </h5>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border-5 border-zinc-600 shadow-lg bg-zinc-300 p-6">
            <h5 className="font-bold text-lg">Sisteme Tanım</h5>
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                href={`/dashboard/admin/${userId}/system-management/add-drug-or-test`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  İlaç ve Tahlil Birimi Ekleme ve Güncelleme
                </h5>
              </Link>
              <Link
                href={`/dashboard/admin/${userId}/system-management/add-clinic`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Klinik Ekleme ve Güncelleme
                </h5>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border-5 border-zinc-600 shadow-lg bg-zinc-300 p-6">
            <h5 className="font-bold text-lg">Kullanıcı Yönetimi</h5>
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                href={`/dashboard/admin/${userId}/user-management/feedback`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Kullanıcı Yorumları
                </h5>
              </Link>
              <Link
                href={`/dashboard/admin/${userId}/user-management/user`}
                className="flex flex-col rounded-md border-4 border-slate-600 bg-slate-200 p-2 shadow-2xl hover:cursor-pointer hover:opacity-85"
              >
                <h5 className="my-auto text-center font-semibold">
                  Kullanıcıları Yönet
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
}
