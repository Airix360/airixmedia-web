#!/usr/bin/env python3
from hashlib import sha256
from pathlib import Path
import json
from PIL import Image, ImageChops, ImageStat

ROOT = Path("/Users/hendrix/airix-atlas-r3-source/Production/Priority")
OUTPUT = Path("output/atlas-r3-wave1-intake-report.json")
PAIRS = {
    "/atlas": ("Atlas/atlas-day-master.png", "Atlas/atlas-night-master.png"),
    "/discuss": ("Discuss/discuss-day-master.png", "Discuss/discuss-night-master.png"),
    "/contact": ("Contact/contact-day-master.png", "Contact/contact-night-master.png"),
    "/book": ("Book/book-day-master.png", "Book/book-night-master.png"),
}

def luminance(image):
    r, g, b = ImageStat.Stat(image.convert("RGB")).mean
    return round(r * .2126 + g * .7152 + b * .0722, 2)

records, hashes = [], {}
for route, names in PAIRS.items():
    pair = []
    for mode, name in zip(("day", "night"), names):
        path = ROOT / name
        record = {"route": route, "mode": mode, "expectedPath": str(path), "status": "missing-source-master"}
        if path.is_file():
            try:
                data = path.read_bytes(); digest = sha256(data).hexdigest(); image = Image.open(path); image.load()
                width, height = image.size
                record.update({"status": "received-pending-human-review", "format": image.format, "width": width, "height": height, "sha256": digest, "standaloneDimensionCheck": height / width < 1.2, "luminance": luminance(image)})
                if image.format != "PNG": record["status"] = "invalid-format"
                if height / width >= 1.2: record["status"] = "comparison-board-dimension-risk"
                hashes.setdefault(digest, []).append(name); pair.append((record, image.convert("RGB"), digest))
            except Exception as error: record.update({"status": "unreadable-image", "error": str(error)})
        records.append(record)
    if len(pair) == 2:
        day_record, day, day_hash = pair[0]; night_record, night, night_hash = pair[1]
        same_size = day.size == night.size; difference = round(sum(ImageStat.Stat(ImageChops.difference(day, night)).mean) / 3, 2) if same_size else None
        checks = {"matchingDimensions": same_size, "identicalBytes": day_hash == night_hash, "nightDarker": night_record["luminance"] < day_record["luminance"], "perceptualDifference": difference, "differencePass": difference is not None and difference >= 10}
        day_record["pairChecks"] = checks; night_record["pairChecks"] = checks
        if not all((same_size, day_hash != night_hash, checks["nightDarker"], checks["differencePass"])): day_record["status"] = night_record["status"] = "pair-validation-failed"

duplicates = {digest: files for digest, files in hashes.items() if len(files) > 1}
for record in records:
    if record.get("sha256") in duplicates: record["status"] = "duplicate-source-master"
report = {"root": str(ROOT), "expected": 8, "received": sum("sha256" in record for record in records), "missing": sum(record["status"] == "missing-source-master" for record in records), "duplicates": duplicates, "records": records, "automatedApproval": False}
OUTPUT.parent.mkdir(parents=True, exist_ok=True); OUTPUT.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({key: report[key] for key in ("expected", "received", "missing")}, indent=2))
