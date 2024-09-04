import { Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React, { Suspense } from "react";

export default function ClinicsManagementAdminView() {
  return (
    <Suspense
      fallback={
        <div className="text-center">
          <Spinner size="xl" aria-label="Loading" />
        </div>
      }
    >
      <div className="flex w-full flex-row flex-wrap items-start gap-6 p-6">
        <form className="flex flex-col gap-4 rounded-md border-3 border-zinc-600 bg-zinc-300 p-6 shadow-2xl drop-shadow-2xl">
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4">
              <span className="text-lg font-bold">İşlem Seçin</span>
            </legend>
            <div className="flex items-center gap-2">
              <Radio
                id="guncellek"
                name="islemseceneklinik"
                value="update"
                defaultChecked
              />
              <Label htmlFor="guncellek">Klinik Güncelle</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="eklek" name="islemsecenekklinik" value="add" />
              <Label htmlFor="eklek">Klinik Ekle</Label>
            </div>
          </fieldset>
          <div className="flex flex-col gap-3">
            <div className="mb-2 block">
              <Label htmlFor="klinikad" value="Klinik Adı" />
              <TextInput id="klinikad" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="adres" value="Adres" />
              <TextInput id="adres" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="acilis" value="Açılış" />
              <TextInput id="acilis" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="kapanis" value="Kapanış" />
              <TextInput id="kapanis" type="text" shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="paydosb" value="Paydoş Başlangıç" />
              <TextInput id="paydosb" type="text" shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="paydosbi" value="Paydoş Bitiş" />
              <TextInput id="paydosbi" type="text" shadow />
            </div>
          </div>
          <Button type="submit">Gönder</Button>
        </form>
        <form className="flex flex-col gap-4 rounded-md border-3 border-zinc-600 bg-zinc-300 p-6 shadow-2xl drop-shadow-2xl">
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4">
              <span className="text-lg font-bold">İşlem Seçin</span>
            </legend>
            <div className="flex items-center gap-2">
              <Radio
                id="guncelleko"
                name="islemsecenekkliniko"
                value="update"
                defaultChecked
              />
              <Label htmlFor="guncelleko">Klinik Odası Güncelle</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="ekleko" name="islemsecenekko" value="add" />
              <Label htmlFor="ekleko">Klinik Odası Ekle</Label>
            </div>
          </fieldset>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="klinikid" value="Klinik Id" />
              <TextInput id="klinikid" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="numara" value="Numara" />
              <TextInput id="numara" type="text" required shadow />
            </div>
          </div>
          <Button type="submit">Gönder</Button>
        </form>
      </div>
    </Suspense>
  );
}
