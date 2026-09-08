/** Partner logo assets, in the same order as their names in the translated content. */
const P = `${import.meta.env.BASE_URL}images/partners/`;

export const hostClubLogo = `${P}rotary-surat-riverside.webp`;
export const participatingClubLogos = [
  `${P}rotary-udhna.webp`,
  `${P}rotary-tapi.webp`,
  `${P}rotary-sachin.webp`,
  `${P}rotary-surat-seaface.webp`,
  `${P}rotary-shades-valley.webp`,
];
export const districtLogos = [`${P}rotary-district-3060.webp`, `${P}rotary-district-3142.webp`, `${P}rotary-district-6860.webp`];

export const collegeLogo = `${P}government-medical-college.webp`;
export const healthcareLogo = `${P}new-civil-hospital.webp`;
// Paediatrics uses the authentic logo of its parent institution, GMC Surat.
export const healthcareImages = [collegeLogo, healthcareLogo, collegeLogo];

export const implementationLogo = `${P}chhanyado.webp`;

export const associationLogos = [
  implementationLogo,
  `${P}surat-pediatric-association.webp`,
  `${P}academy-of-pediatrics-gujarat.webp`,
  `${P}indian-academy-of-pediatrics.webp`,
];

export const partnerLogos = [hostClubLogo, ...participatingClubLogos, collegeLogo, healthcareLogo, implementationLogo];
