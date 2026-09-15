// Submits to a Google Form's `formResponse` endpoint. Sends every answer as
// a flat `entry.*` param (regardless of which page it's on in the real
// form) plus the session-shaped params Google's own client also sends
// (`fbzx`, `pageHistory`, `fvv`, `submissionTimestamp`) — this is the
// combination that was confirmed to actually land in a form's Responses
// tab (the donor form, checked by hand). A version of this that bundled
// non-final-page answers into a `partialResponse` JSON blob instead was
// tried and made things worse, so it was reverted.
//
// `pageHistory` must list every real page index (0-based) the form has,
// comma-separated — get this wrong (e.g. "0" for a form that's actually
// 3 pages) and the submission is silently dropped despite the confirmation
// page still saying "recorded".
export interface GoogleFormEntry {
  entryId: string; // e.g. "entry.619327651"
  value: string;
}

export function submitGoogleForm(formId: string, entries: GoogleFormEntry[], totalPages: number): void {
  const fbzx = String(-Math.floor(Math.random() * 1e18));

  const body = new URLSearchParams();
  for (const e of entries) body.set(e.entryId, e.value);
  body.set("fvv", "1");
  body.set("pageHistory", Array.from({ length: totalPages }, (_, i) => i).join(","));
  body.set("fbzx", fbzx);
  body.set("submissionTimestamp", String(Date.now()));

  const endpoint = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  fetch(endpoint, { method: "POST", mode: "no-cors", body }).catch(() => {});
}
