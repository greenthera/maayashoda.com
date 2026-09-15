// Mirrors the "Maa Yashoda – Register Your Interest in Becoming a Milk Donor"
// Google Form (created in the Shivantra Solutions account) so responses
// submitted through the site's own donor form also land in that form's
// Responses tab / linked Sheet. Entry IDs confirmed against the form's
// public field data; the form has 2 pages (fields, then the 2 consent
// checkboxes) — see googleFormSubmit.ts for why the page count matters.
import { submitGoogleForm, type GoogleFormEntry } from "./googleFormSubmit";

const DONOR_FORM_ID = "1FAIpQLSf_-Mj4csyy8zDE2WovX_RpWuFMKBTPnv7SWkB0I35JCLMFqg";
const DONOR_TOTAL_PAGES = 2;

const ENTRY = {
  fullName: "entry.1598558302",
  mobile: "entry.1641037315",
  email: "entry.553826599",
  city: "entry.1281048375",
  state: "entry.8584292",
  interest: "entry.1400423892",
  contactMethod: "entry.1293970948",
  message: "entry.117237843",
  consentVoluntary: "entry.19771912",
  consentContact: "entry.204479857",
};

// __other_option__ is the token Google's public formResponse encoding uses
// for a free-text "Other" answer, paired with an `.other_option_response`
// entry carrying the typed text.
const OTHER_TOKEN = "__other_option__";

// Canonical English option text the Google Form expects, independent of the
// site's active display language (hi/gu translations don't match the
// English-only Google Form choices).
export const DONOR_INTEREST_CANONICAL = [
  "I would like to learn more about milk donation",
  "I am interested in becoming a potential milk donor",
  "I would like guidance through the process",
  "Other",
] as const;

export const DONOR_CONTACT_METHOD_CANONICAL = ["Phone", "WhatsApp", "Email"] as const;

export interface DonorGoogleFormSubmission {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  /** Index into DONOR_INTEREST_CANONICAL, or -1 if not selected. */
  interestIndex: number;
  /** Index into DONOR_CONTACT_METHOD_CANONICAL, or -1 if not selected. */
  contactMethodIndex: number;
  message: string;
}

export function submitDonorInterestToGoogleForm(data: DonorGoogleFormSubmission): void {
  const entries: GoogleFormEntry[] = [];
  entries.push({ entryId: ENTRY.fullName, value: data.fullName });
  entries.push({ entryId: ENTRY.mobile, value: data.mobile });
  if (data.email) entries.push({ entryId: ENTRY.email, value: data.email });
  entries.push({ entryId: ENTRY.city, value: data.city });
  if (data.state) entries.push({ entryId: ENTRY.state, value: data.state });

  const interest = DONOR_INTEREST_CANONICAL[data.interestIndex];
  if (interest === "Other") {
    entries.push({ entryId: ENTRY.interest, value: OTHER_TOKEN });
    entries.push({ entryId: `${ENTRY.interest}.other_option_response`, value: data.message });
  } else if (interest) {
    entries.push({ entryId: ENTRY.interest, value: interest });
  }

  const contactMethod = DONOR_CONTACT_METHOD_CANONICAL[data.contactMethodIndex];
  if (contactMethod) entries.push({ entryId: ENTRY.contactMethod, value: contactMethod });

  if (data.message) entries.push({ entryId: ENTRY.message, value: data.message });

  entries.push({ entryId: ENTRY.consentVoluntary, value: "I agree" });
  entries.push({ entryId: ENTRY.consentContact, value: "I agree" });

  submitGoogleForm(DONOR_FORM_ID, entries, DONOR_TOTAL_PAGES);
}
