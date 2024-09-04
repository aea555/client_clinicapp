import { Button, Label, Radio, Spinner, TextInput } from "flowbite-react";
import React, { Suspense } from "react";

export default function DrugManagementAdminView() {
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
                id="guncellet"
                name="islemsecenektahlil"
                value="update"
                defaultChecked
              />
              <Label htmlFor="guncellet">Tahlil Birimi Güncelle</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="eklet" name="islemsecenektahlil" value="add" />
              <Label htmlFor="eklet">Tahlil Birimi Ekle</Label>
            </div>
          </fieldset>
          <div className="flex flex-col gap-3">
            <div className="mb-2 block">
              <Label htmlFor="tahlilad" value="Tahlil Adı" />
              <TextInput id="tahlilad" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="birim" value="Ölçek Tipi" />
              <TextInput id="birim" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="altsinir" value="Alt Normal Sınır" />
              <TextInput id="altsinir" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="ustsinir" value="Üst Normal Sınır" />
              <TextInput id="ustsinir" type="text" required shadow />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="desc" value="Açıklama (Opsiyonel)" />
              <TextInput id="desc" type="text" shadow />
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
                id="guncellei"
                name="islemsecenekilac"
                value="update"
                defaultChecked
              />
              <Label htmlFor="guncellei">İlaç Güncelle</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="eklei" name="islemsecenektahlil" value="add" />
              <Label htmlFor="eklei">İlaç Ekle</Label>
            </div>
          </fieldset>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ilacad" value="İlaç Adı" />
            </div>
            <TextInput id="ilacad" type="text" required shadow />
          </div>
          <Button type="submit">Gönder</Button>
        </form>
      </div>
    </Suspense>
  );
}
