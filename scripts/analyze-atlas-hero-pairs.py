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
output = Path("output/playwright/atlas-artwork-r2-1/perceptual-report.json")
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(rows, indent=2) + "\n")
if any(row["status"] != "pass" for row in rows): raise SystemExit("One or more hero pairs require replacement night artwork")
