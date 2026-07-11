#!/usr/bin/env python3
"""Convert all JPG/PNG images in public/images to WebP using Pillow."""
import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

BASE = Path("/home/z/my-project/public/images")
QUALITY = 82
MAX_WIDTHS = {
    "hero/cafe-hero-brunch-table": 2200,
    "hero/hero-coffee-cup-detail": 1200,
    "hero/hero-pastry-close": 1200,
    "home/home-interior-wide": 2000,
    "home/home-story-detail": 1200,
    "home/morning-barista": 1600,
    "home/midday-brunch": 1600,
    "home/evening-table": 1600,
    "home/home-room-wide": 2200,
    "menu/sea-salt-mocha": 1200,
    "menu/saffron-honey-pancakes": 1200,
    "menu/rose-pistachio-french-toast": 1200,
    "about/about-hero-interior": 2200,
    "about/about-cafe-story": 1600,
    "about/morning-espresso": 1200,
    "about/afternoon-brunch": 1600,
    "about/evening-candle-table": 1600,
    "gallery/barista-pouring-espresso": 1200,
    "gallery/latte-art-detail": 1200,
    "gallery/saffron-pancakes-plate": 1400,
    "gallery/brunch-spread-table": 1600,
    "gallery/avocado-toast-detail": 1200,
    "gallery/warm-cafe-interior": 1600,
    "gallery/cafe-window-seat": 1200,
    "gallery/coffee-bar-counter": 1600,
    "gallery/friends-at-table": 1400,
    "gallery/group-brunch": 1600,
    "gallery/coffee-beans-detail": 1200,
    "gallery/pastry-display": 1200,
    "gallery/evening-candle-table": 1400,
    "gallery/evening-cafe-atmosphere": 1600,
    "gallery/herb-garden-window": 1200,
    "gallery/cafe-exterior-street": 1600,
    "gallery/chilli-butter-eggs": 1200,
    "gallery/ceramic-cup-hands": 1200,
    "contact/cafe-exterior-hero": 1600,
}

converted = 0
skipped = 0
errors = 0

for img_file in sorted(BASE.rglob("*")):
    if not img_file.is_file():
        continue
    if img_file.suffix.lower() not in (".jpg", ".jpeg", ".png"):
        continue

    # Determine target webp path
    rel = img_file.relative_to(BASE)
    name_stem = str(rel.with_suffix(""))
    target = BASE / f"{name_stem}.webp"

    if target.exists():
        skipped += 1
        # Remove the old non-webp file
        img_file.unlink()
        continue

    try:
        img = Image.open(img_file)
        # Convert RGBA to RGB
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGB")

        # Resize if needed
        max_w = MAX_WIDTHS.get(name_stem, 2000)
        if img.width > max_w:
            ratio = max_w / img.width
            new_h = int(img.height * ratio)
            img = img.resize((max_w, new_h), Image.LANCZOS)

        img.save(target, "WEBP", quality=QUALITY)
        img.close()

        # Remove original
        img_file.unlink()

        size_kb = target.stat().st_size / 1024
        print(f"  OK: {target.relative_to(BASE)} ({size_kb:.0f} KB)")
        converted += 1
    except Exception as e:
        print(f"  ERR: {img_file.name}: {e}")
        errors += 1

print(f"\nConverted: {converted}, Skipped (exists): {skipped}, Errors: {errors}")

# Copy gallery exterior to contact
contact_hero = BASE / "contact" / "cafe-exterior-hero.webp"
gallery_ext = BASE / "gallery" / "cafe-exterior-street.webp"
if not contact_hero.exists() and gallery_ext.exists():
    import shutil
    contact_hero.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(gallery_ext, contact_hero)
    print(f"  COPY: gallery/cafe-exterior-street.webp -> contact/cafe-exterior-hero.webp")

# Verify no stale files remain
stale = list(BASE.rglob("*.jpg")) + list(BASE.rglob("*.jpeg")) + list(BASE.rglob("*.png"))
if stale:
    print(f"\nWARNING: {len(stale)} stale non-WebP files remain:")
    for f in stale:
        print(f"  {f}")
else:
    print("\nAll images are WebP. Clean.")