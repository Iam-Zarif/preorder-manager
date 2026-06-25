"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";


import { Button } from "@/src/components/ui/Button";
import { Field } from "@/src/components/ui/Field";
import { SelectInput, TextInput } from "@/src/components/ui/FormControl";
import { Switch } from "@/src/components/ui/Switch";
import { preorderWhenOptions } from "@/src/lib/constants";
import { fromInputDateTime, toInputDateTime } from "@/src/lib/utils";
import { colors } from "@/src/theme/color";
import { usePreorderForm } from "@/src/hooks/usePreorderForm";
import type { Preorder, PreorderPayload, PreorderWhen } from "@/src/types/preorder";

const emptyValues = {
  name: "",
  products: 1,
  preorderWhen: "REGARDLESS_OF_STOCK" as PreorderWhen,
  startsAt: "",
  endsAt: "",
  status: true,
};


type PreorderFormPageProps = {
  preorder?: Preorder;
};


export function PreorderFormPage({ preorder }: PreorderFormPageProps) {
  const [values, setValues] = useState(() => {
    if (!preorder) return emptyValues;

    return {
      name: preorder.name,
      products: preorder.products,
      preorderWhen: preorder.preorderWhen,
      startsAt: toInputDateTime(preorder.startsAt),
      endsAt: preorder.endsAt ? toInputDateTime(preorder.endsAt) : "",
      status: preorder.status,
    };
  });




  const form = usePreorderForm(preorder?.id);

  function update<Value extends keyof typeof values>(
    key: Value,
    value: (typeof values)[Value],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();



    const payload: PreorderPayload = {
      name: values.name,
      products: Number(values.products),
      preorderWhen: values.preorderWhen,
      startsAt: fromInputDateTime(values.startsAt),
      endsAt: values.endsAt ? fromInputDateTime(values.endsAt) : null,
      status: values.status,
    };

    void form.save(payload);
  }


  return (
    <main className="min-h-screen pt-6.25" style={{ backgroundColor: colors.page }}>

      <form
        key={preorder?.id ?? "new"}
        onSubmit={handleSubmit}
        className="mx-auto w-228"
      >

        <div className="mb-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="secondary" className="gap-2">
              <ChevronLeft size={16} />
              Back
            </Button>
          </Link>
          <div className="flex gap-2.5">
            <Link href="/">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <Button disabled={form.saving} type="submit">
              {form.saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
        <section className="overflow-hidden rounded-[9px] border border-[#dfe3e8] bg-white">
          <div className="px-6.25 py-5.5">
            <h1 className="text-[16px] font-bold leading-5.5 text-[#071323]">
              Preorder details
            </h1>
            <p className="mt-1 text-[14px] leading-5 text-[#5f6b85]">
              These values appear in the preorders list.
            </p>
          </div>
          <div className="border-t border-[#e0e3e7] px-6.25 py-2">
            <Field
              label={
                <>
                  Name <span className="text-[#c1272d]">*</span>
                </>
              }
              description="A label to recognize this preorder by."
            >
              <TextInput
                required
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                className="w-105"
              />
            </Field>
            <Field
              label="Products"
              description="Number of products covered by this preorder."
            >
              <div className="flex items-center gap-2.5">
                <TextInput
                  min={1}
                  type="number"
                  value={values.products}
                  onChange={(event) => update("products", Number(event.target.value))}
                  className="w-35"
                />
                <span className="text-[14px] text-[#5f6b85]">product(s)</span>
              </div>
            </Field>
            <Field
              label="Preorder when"
              description="When customers are allowed to preorder."
            >
              <SelectInput
                value={values.preorderWhen}
                onChange={(event) =>
                  update("preorderWhen", event.target.value as PreorderWhen)
                }
                className="w-105"
              >
                {preorderWhenOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Starts at" description="When the preorder window opens.">
              <TextInput
                required
                type="datetime-local"
                value={values.startsAt}
                onChange={(event) => update("startsAt", event.target.value)}
                className="w-105"
              />
            </Field>
            <Field label="Ends at" description="Leave empty for no end date.">
              <TextInput
                type="datetime-local"
                value={values.endsAt}
                onChange={(event) => update("endsAt", event.target.value)}
                className="w-105"
              />
            </Field>
            <Field
              label="Status"
              description="Active preorders are visible to customers."
            >
              <div className="flex items-center gap-3 pt-1">
                <Switch
                  checked={values.status}
                  label="Toggle preorder status"
                  onChange={() => update("status", !values.status)}
                />
                <span className="text-[14px] font-medium text-[#42526e]">
                  {values.status ? "Active" : "Inactive"}
                </span>
              </div>
            </Field>
            {form.error ? (
              <p className="pb-4 text-[14px] font-bold text-[#b42318]">
                {form.error}
              </p>
            ) : null}
          </div>
          <div className="flex h-17.25 items-center justify-end gap-2.5 border-t border-[#e0e3e7] bg-[#fbfbfb] px-6.25">
            <Link href="/">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <Button disabled={form.saving} type="submit">
              {form.saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </section>
      </form>
    </main>
  );
}
