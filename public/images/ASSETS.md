# Website artwork

## Supplied PDF artwork

All 11 supplied PDFs are converted to lossless WebP in `pdf/`, at a 2400-pixel longest edge. They contain vector artwork, so each complete page is rendered without AI alteration. `pdf/manifest.json` maps every output to its source. The 11 original PDFs were deleted at the user’s request after verifying that every rendered page matched its lossless WebP copy pixel-for-pixel when composited on white. Source filenames remain in the manifest for provenance. Original PNG uploads remain untouched.

For future PDF uploads, run `python3 scripts/convert-pdf-assets.py` (requires PyMuPDF and Pillow); the original PDFs are required to regenerate their outputs. Matching supplied Rotary logos are used on the home and partners pages. Additional supplied variants and district artwork remain available without assigning unconfirmed partner roles.

## Moments from the initiative

Only this gallery uses generated artwork: five rich, detailed editorial illustrations saved as `moments/*-rich.webp`, 1536 × 1024. They are illustrative scenes, not event photographs. Generated with the built-in image-generation tool and converted to WebP at quality 90. The old simple SVG illustrations and generated standalone van have been removed from the website.

Prompt direction for all five: premium editorial illustration for Yashoda Maa maternal and newborn milk-bank outreach in Surat; rich vector-inspired contours, subtle grain, layered architecture, soft golden lighting, expressive Indian faces and hands, detailed textiles and plants; raspberry pink, navy, ivory, teal and saffron; warm dignified mood; full-bleed landscape, no lettering or watermarks, main subjects within central 70% for responsive crops.

Scene prompts:

- Awareness session: female healthcare educator in a white coat explaining milk donation to mothers in patterned saris, one holding a swaddled newborn; sunlit community room, arched windows, plants and wooden chairs.
- Community outreach: outreach volunteer with pink information folder meets a mother holding a baby and another woman at a shaded courtyard doorway; carved terracotta architecture, bougainvillea and dappled sunlight.
- Partner engagement: five community partners including a female doctor planning maternal support around a wooden table; pink project folder, warm smiles, arched window, trees and Surat architecture, flowers and indigo upholstery.
- Milk bank van: white outreach van with pink/navy stripes and a mother-and-baby emblem, parked in a flowering Surat courtyard; healthcare worker greeting a mother; entire van visible, no lettering.
- Team at work: healthcare professionals reviewing maternal-support information with a seated mother and swaddled newborn; teal cabinetry, neat shelves, plants, pink accents and warm window light.

## Partner display assets

`partners/` contains tightly framed display copies of the PDF logos and authentic institutional logos. See `partners/SOURCES.md` for official source URLs and resolution notes. Home marquees display logos only; partner cards pair larger artwork with names.

## Original project images

`project/yashoda-maa.webp` is a WebP conversion of the supplied `src/assets/Yashoda Maa.png`, used on About. `project/yashoda-maa-mark.webp` is the same supplied logo with its outer white flood-filled to transparency (interior fill and all detail unchanged), used as the Home hero mark.

`team/prashant-kariya.webp` is the user-supplied photo of Dr. Prashant Kariya (primary project contact), resized to 600 × 600 and converted to WebP; shown on the Contact page.

`project/van-cutout.webp` (1175 × 534) is the user-supplied van artwork with its background removed, used on Home and the van page. The user provided a branded side-view van illustration exported over a flattened checkerboard (no real alpha); the checkerboard was removed programmatically via a silhouette-hull mask and the van composited onto real transparency. The van illustration itself is AI-generated artwork supplied by the user — no details were added or altered here beyond the background cut. A soft `drop-shadow` is applied in CSS (`VanScene`) so the shadow tracks the van shape.
