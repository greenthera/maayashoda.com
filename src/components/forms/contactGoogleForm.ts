// Mirrors the "Maa Yashoda – General Enquiry" Google Form (created in the
// Shivantra Solutions account) so responses submitted through the site's
// own contact form also land in that form's Responses tab / linked Sheet.
// This form has 3 pages (an intro page with no fields, a "Basic
// Information" page, and a final "Consent" page) — confirmed via a real
// browser-driven capture of a live submission. See googleFormSubmit.ts for
// why the page count matters even though every answer is sent as a flat
// entry.* param regardless of which page it's actually on.
import { submitGoogleForm, type GoogleFormEntry } from "./googleFormSubmit";

const CONTACT_FORM_ID = "1FAIpQLSfJnBWs_Z9RV926xLTQiXDPoYo4uCbFP0X51CulaUcylqYqwg";
const CONTACT_TOTAL_PAGES = 3;

const ENTRY = {
  fullName: "entry.619327651",
  mobile: "entry.1285883306",
  email: "entry.1758982342",
  org: "entry.1714665386",
  category: "entry.311537686",
  message: "entry.1704978867",
  contactMethod: "entry.573101920",
  consentGeneral: "entry.50766503",
};

// Canonical English option text the Google Form expects. This matches
// t.contact.categories (English) exactly, so no index-based remapping is
// needed for category — only contactMethod needs it (site's "Email Address"
// label vs. the Form's "Email" choice).
export const CONTACT_METHOD_CANONICAL = ["Phone", "WhatsApp", "Email"] as const;

export interface ContactGoogleFormSubmission {
  fullName: string;
  mobile: string;
  email: string;
  org: string;
  category: string;
  message: string;
  /** Index into CONTACT_METHOD_CANONICAL, or -1 if not selected. */
  contactMethodIndex: number;
}

export function submitContactEnquiryToGoogleForm(data: ContactGoogleFormSubmission): void {
  const entries: GoogleFormEntry[] = [];
  entries.push({ entryId: ENTRY.fullName, value: data.fullName });
  entries.push({ entryId: ENTRY.mobile, value: data.mobile });
  if (data.email) entries.push({ entryId: ENTRY.email, value: data.email });
  if (data.org) entries.push({ entryId: ENTRY.org, value: data.org });
  if (data.category) entries.push({ entryId: ENTRY.category, value: data.category });
  entries.push({ entryId: ENTRY.message, value: data.message });

  const contactMethod = CONTACT_METHOD_CANONICAL[data.contactMethodIndex];
  if (contactMethod) entries.push({ entryId: ENTRY.contactMethod, value: contactMethod });

  entries.push({ entryId: ENTRY.consentGeneral, value: "I agree" });

  submitGoogleForm(CONTACT_FORM_ID, entries, CONTACT_TOTAL_PAGES);
}
