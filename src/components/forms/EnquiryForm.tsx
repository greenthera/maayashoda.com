import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageProvider";
import { CheckboxField, RadioGroupField, SelectField, TextField, TextareaField } from "./fields";

export type FormVariant = "donor" | "support" | "contact";

type FieldKind = "text" | "email" | "tel" | "select" | "textarea" | "radio";

interface FieldSpec {
  id: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  errorMessage?: string;
  mobile?: boolean;
  email?: boolean;
  options?: string[];
  helper?: string;
  autoComplete?: string;
}

interface SectionSpec {
  title: string;
  columns: 1 | 2;
  fields: FieldSpec[];
}

function useSchema(variant: FormVariant): { sections: SectionSpec[]; consents: { id: string; label: string }[] } {
  const { t } = useLanguage();
  const f = t.form;

  if (variant === "donor") {
    return {
      sections: [
        {
          title: t.donor.secBasic,
          columns: 2,
          fields: [
            { id: "fullName", label: f.fullName, kind: "text", required: true, errorMessage: f.errName, autoComplete: "name" },
            { id: "mobile", label: f.mobile, kind: "tel", required: true, errorMessage: f.errMobile, mobile: true, helper: f.helperMobile, autoComplete: "tel" },
            { id: "email", label: f.email, kind: "email", email: true, errorMessage: f.errEmail, helper: f.helperEmail, autoComplete: "email" },
          ],
        },
        {
          title: t.donor.secLocation,
          columns: 2,
          fields: [
            { id: "city", label: f.city, kind: "text", required: true, errorMessage: f.errCity, autoComplete: "address-level2" },
            { id: "state", label: f.state, kind: "text", autoComplete: "address-level1" },
          ],
        },
        {
          title: t.donor.secInterest,
          columns: 1,
          fields: [{ id: "interest", label: f.describeYou, kind: "select", required: true, errorMessage: f.errSelect, options: f.interestOptions }],
        },
        {
          title: t.donor.secContact,
          columns: 1,
          fields: [{ id: "contactMethod", label: f.contactMethod, kind: "radio", options: [f.phone, f.whatsapp, f.email] }],
        },
        {
          title: t.donor.secMessage,
          columns: 1,
          fields: [{ id: "message", label: f.additional, kind: "textarea" }],
        },
      ],
      consents: [
        { id: "consentVoluntary", label: f.consentVoluntary },
        { id: "consentContact", label: f.consentContact },
      ],
    };
  }

  if (variant === "support") {
    return {
      sections: [
        {
          title: t.donor.secBasic,
          columns: 2,
          fields: [
            { id: "fullName", label: f.fullName, kind: "text", required: true, errorMessage: f.errName, autoComplete: "name" },
            { id: "org", label: f.org, kind: "text", autoComplete: "organization" },
            { id: "designation", label: f.designation, kind: "text" },
            { id: "mobile", label: f.mobile, kind: "tel", required: true, errorMessage: f.errMobile, mobile: true, autoComplete: "tel" },
            { id: "email", label: f.email, kind: "email", required: true, email: true, errorMessage: f.errEmail, autoComplete: "email" },
          ],
        },
        {
          title: t.support.supportType,
          columns: 2,
          fields: [
            { id: "supportType", label: t.support.supportType, kind: "select", required: true, errorMessage: f.errSelect, options: t.support.supportTypes },
            { id: "areaOfInterest", label: t.support.areaOfInterest, kind: "text" },
          ],
        },
        {
          title: f.message,
          columns: 1,
          fields: [{ id: "message", label: f.message, kind: "textarea", required: true, errorMessage: f.errMessage }],
        },
      ],
      consents: [{ id: "consentGeneral", label: f.consentGeneral }],
    };
  }

  return {
    sections: [
      {
        title: t.donor.secBasic,
        columns: 2,
        fields: [
          { id: "fullName", label: f.fullName, kind: "text", required: true, errorMessage: f.errName, autoComplete: "name" },
          { id: "mobile", label: f.mobile, kind: "tel", required: true, errorMessage: f.errMobile, mobile: true, autoComplete: "tel" },
          { id: "email", label: f.email, kind: "email", email: true, errorMessage: f.errEmail, autoComplete: "email" },
          { id: "org", label: f.org, kind: "text", autoComplete: "organization" },
        ],
      },
      {
        title: t.contact.category,
        columns: 1,
        fields: [{ id: "category", label: t.contact.category, kind: "select", required: true, errorMessage: f.errSelect, options: t.contact.categories }],
      },
      {
        title: f.message,
        columns: 1,
        fields: [{ id: "message", label: f.message, kind: "textarea", required: true, errorMessage: f.errMessage }],
      },
      {
        title: f.contactMethod,
        columns: 1,
        fields: [{ id: "contactMethod", label: f.contactMethod, kind: "radio", options: [f.phone, f.whatsapp, f.email] }],
      },
    ],
    consents: [{ id: "consentGeneral", label: f.consentGeneral }],
  };
}

const MOBILE_RE = /^[+]?[0-9\s-]{8,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function EnquiryForm({ variant }: { variant: FormVariant }) {
  const { t, paths } = useLanguage();
  const navigate = useNavigate();
  const thanksPath: Record<FormVariant, string> = {
    donor: paths.thanksDonor,
    support: paths.thanksSupport,
    contact: paths.thanksContact,
  };
  const { sections, consents } = useSchema(variant);

  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState(false);

  const setField = (id: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const val = target.type === "checkbox" ? target.checked : target.value;
    setValues((prev) => ({ ...prev, [id]: val }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const submitLabel =
    variant === "donor" ? t.cta.register : variant === "support" ? t.cta.sendSupport : t.cta.sendEnquiry;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    for (const section of sections) {
      for (const field of section.fields) {
        const raw = values[field.id];
        const val = typeof raw === "string" ? raw.trim() : raw;
        if (field.required && !val) {
          nextErrors[field.id] = field.errorMessage ?? t.form.errSelect;
          continue;
        }
        if (field.mobile && val && !MOBILE_RE.test(String(val))) {
          nextErrors[field.id] = t.form.errMobile;
          continue;
        }
        if (field.email && val && !EMAIL_RE.test(String(val))) {
          nextErrors[field.id] = t.form.errEmail;
        }
      }
    }
    for (const consent of consents) {
      if (!values[consent.id]) nextErrors[consent.id] = t.form.errConsent;
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || honeypot) return;

    navigate(thanksPath[variant]);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
        onChange={(e) => setHoneypot(!!e.target.value)}
      />

      {sections.map((section) => (
        <fieldset key={section.title} className="flex flex-col gap-4.5 border-0 p-0 m-0">
          {!(section.fields.length === 1 && section.fields[0].label === section.title) ? (
            <legend className="text-faint mb-3.5 p-0 text-[11.5px] font-semibold uppercase tracking-[0.09em]">{section.title}</legend>
          ) : null}
          <div className={`grid grid-cols-1 gap-4.5 ${section.columns === 2 ? "sm:grid-cols-2" : ""}`}>
            {section.fields.map((field) => {
              const rawValue = values[field.id];
              const value = typeof rawValue === "string" ? rawValue : "";
              const error = errors[field.id];
              if (field.kind === "select") {
                return (
                  <SelectField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    value={value}
                    onChange={setField(field.id)}
                    required={field.required}
                    error={error}
                    options={field.options ?? []}
                    placeholder={t.form.select}
                  />
                );
              }
              if (field.kind === "textarea") {
                return (
                  <TextareaField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    value={value}
                    onChange={setField(field.id)}
                    required={field.required}
                    error={error}
                  />
                );
              }
              if (field.kind === "radio") {
                return (
                  <RadioGroupField
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    value={value}
                    onChange={setField(field.id)}
                    options={field.options ?? []}
                  />
                );
              }
              return (
                <TextField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  type={field.kind}
                  value={value}
                  onChange={setField(field.id)}
                  required={field.required}
                  error={error}
                  helper={field.helper}
                  autoComplete={field.autoComplete}
                  inputMode={field.kind === "tel" ? "tel" : field.kind === "email" ? "email" : "text"}
                />
              );
            })}
          </div>
        </fieldset>
      ))}

      <fieldset className="border-border flex flex-col gap-4 border-0 border-t p-0 pt-2">
        <legend className="text-faint mb-1 p-0 text-[11.5px] font-semibold uppercase tracking-[0.09em]">{t.donor.secConsent}</legend>
        {consents.map((c) => (
          <CheckboxField
            key={c.id}
            id={c.id}
            label={c.label}
            checked={!!values[c.id]}
            onChange={setField(c.id)}
            error={errors[c.id]}
          />
        ))}
        <p className="text-faint text-[13px] leading-snug">
          <a href={paths.privacy} className="text-brand font-semibold">
            {t.form.privacyLink}
          </a>
        </p>
      </fieldset>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          className="bg-brand text-paper hover:bg-brand-hover flex min-h-[54px] w-full items-center justify-center rounded-xl px-6 text-base font-semibold"
        >
          {submitLabel}
        </button>
        <p className="text-faint text-[12.5px] leading-snug">{t.form.demoNote}</p>
      </div>
    </form>
  );
}
