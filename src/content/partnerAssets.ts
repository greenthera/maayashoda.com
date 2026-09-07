/** Tightly framed copies of the supplied PDF artwork, in translated content order. */
export const hostClubLogo = `${import.meta.env.BASE_URL}images/partners/rotary-surat-riverside.webp`;
export const participatingClubLogos = [
  `${import.meta.env.BASE_URL}images/partners/rotary-udhna.webp`,
  `${import.meta.env.BASE_URL}images/partners/rotary-tapi.webp`,
  `${import.meta.env.BASE_URL}images/partners/rotary-sachin.webp`,
  `${import.meta.env.BASE_URL}images/partners/rotary-surat-seaface.webp`,
];
export const collegeLogo = `${import.meta.env.BASE_URL}images/partners/government-medical-college.webp`;
export const healthcareLogo = `${import.meta.env.BASE_URL}images/partners/new-civil-hospital.webp`;
// Paediatrics uses the authentic logo of its parent institution, GMC Surat.
export const healthcareImages = [collegeLogo, healthcareLogo, collegeLogo];
export const implementationLogo = `${import.meta.env.BASE_URL}images/partners/chhanyado.webp`;
export const partnerLogos = [hostClubLogo, ...participatingClubLogos, collegeLogo, healthcareLogo, implementationLogo];
