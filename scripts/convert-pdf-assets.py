"""Render every supplied PDF artwork page to a lossless WebP (PyMuPDF + Pillow)."""
import json
import re
from pathlib import Path
import fitz
from PIL import Image
out = Path('public/images/pdf')
out.mkdir(parents=True, exist_ok=True)
manifest = []
for source in sorted(Path('src/assets').glob('*.pdf')):
    slug = re.sub(r'[^a-z0-9]+', '-', source.stem.lower()).strip('-')
    with fitz.open(source) as document:
        for index, page in enumerate(document):
            scale = 2400 / max(page.rect.width, page.rect.height)
            pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=True)
            image = Image.frombytes('RGBA', (pix.width, pix.height), pix.samples)
            target = out / f'{slug}-page-{index + 1}.webp'
            image.save(target, 'WEBP', lossless=True)
            manifest.append(dict(source=str(source), page=index + 1, file=str(target), width=pix.width, height=pix.height))
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Converted {len(manifest)} PDF artwork pages to WebP.')
