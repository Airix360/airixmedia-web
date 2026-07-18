from PIL import Image, ImageChops, ImageStat
from pathlib import Path
import json

root = Path("public/atlas/heroes")
rows = []
for day_path in sorted(root.glob("*-day.webp")):
    night_path = day_path.with_name(day_path.name.replace("-day.webp", "-night.webp"))
    day, night = Image.open(day_path).convert("RGB"), Image.open(night_path).convert("RGB")
    def luminance(image):
        r, g, b = ImageStat.Stat(image).mean
        return round(r * .2126 + g * .7152 + b * .0722, 2)
    difference = round(sum(ImageStat.Stat(ImageChops.difference(day, night)).mean) / 3, 2)
    day_luminance, night_luminance = luminance(day), luminance(night)
    rows.append({"day": day_path.name, "night": night_path.name, "dayLuminance": day_luminance, "nightLuminance": night_luminance, "perceptualDifference": difference, "status": "pass" if night_luminance < day_luminance * .95 and difference >= 10 else "replacement-night-required"})
legacy_output = Path("output/playwright/atlas-artwork-r2-1/perceptual-report.json")
legacy_output.parent.mkdir(parents=True, exist_ok=True)
legacy_output.write_text(json.dumps(rows, indent=2) + "\n")
wave2_names = (
    "airix-digital-experiences-service-journey-",
    "airix-business-systems-operations-",
    "airix-managed-infrastructure-operations-",
    "airix-support-recovery-restoration-",
    "airix-support-operations-",
    "airix-emergency-technical-response-",
)
wave2_rows = [row for row in rows if row["day"].startswith(wave2_names)]
if len(wave2_rows) != 6: raise SystemExit(f"Expected six Wave 2 pairs, found {len(wave2_rows)}")
wave2_output = Path("output/playwright/atlas-artwork-r3-wave2/perceptual-report.json")
wave2_output.parent.mkdir(parents=True, exist_ok=True)
wave2_output.write_text(json.dumps(wave2_rows, indent=2) + "\n")
if any(row["status"] != "pass" for row in rows): raise SystemExit("One or more hero pairs require replacement night artwork")
