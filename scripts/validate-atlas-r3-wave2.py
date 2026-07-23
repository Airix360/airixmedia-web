#!/usr/bin/env python3
from hashlib import sha256
from pathlib import Path
import json
from PIL import Image, ImageChops, ImageStat

ROOT = Path("/Users/hendrix/airix-atlas-r3-source/Production/Services")
OUTPUT = Path("output/atlas-r3-wave2-intake-report.json")
PREFERRED_SIZE = (1536, 1024)
PAIRS = {
    "/services/digital-experiences": ("Digital-Experiences/digital-experiences-day-master.png", "Digital-Experiences/digital-experiences-night-master.png"),
    "/services/business-systems": ("Business-Systems/business-systems-day-master.png", "Business-Systems/business-systems-night-master.png"),
    "/services/managed-infrastructure": ("Managed-Infrastructure/managed-infrastructure-day-master.png", "Managed-Infrastructure/managed-infrastructure-night-master.png"),
    "/services/support-recovery": ("Support-Recovery/support-recovery-day-master.png", "Support-Recovery/support-recovery-night-master.png"),
    "/support": ("Support/support-day-master.png", "Support/support-night-master.png"),
    "/support/emergency": ("Emergency/support-emergency-day-master.png", "Emergency/support-emergency-night-master.png"),
}


def luminance(image):
    red, green, blue = ImageStat.Stat(image.convert("RGB")).mean
    return round(red * .2126 + green * .7152 + blue * .0722, 2)


records, hashes = [], {}
for route, names in PAIRS.items():
    pair = []
    for mode, name in zip(("day", "night"), names):
        path = ROOT / name
        record = {"route": route, "mode": mode, "expectedPath": str(path), "status": "missing-source-master"}
        if path.is_file():
            try:
                data = path.read_bytes()
                digest = sha256(data).hexdigest()
                image = Image.open(path)
                image.load()
                width, height = image.size
                suspicious_diptych = width >= height * 1.9 or height >= width * 1.2
                record.update({
                    "status": "received-pending-human-review",
                    "format": image.format,
                    "width": width,
                    "height": height,
                    "preferredDimensions": image.size == PREFERRED_SIZE,
                    "suspiciousDiptychDimensions": suspicious_diptych,
                    "sha256": digest,
                    "luminance": luminance(image),
                })
                if image.format != "PNG":
                    record["status"] = "invalid-format"
                elif suspicious_diptych:
                    record["status"] = "comparison-board-dimension-risk"
                hashes.setdefault(digest, []).append(name)
                pair.append((record, image.convert("RGB"), digest))
            except Exception as error:
                record.update({"status": "unreadable-image", "error": str(error)})
        records.append(record)

    if len(pair) == 2:
        day_record, day, day_hash = pair[0]
        night_record, night, night_hash = pair[1]
        matching_dimensions = day.size == night.size
        difference = round(sum(ImageStat.Stat(ImageChops.difference(day, night)).mean) / 3, 2) if matching_dimensions else None
        checks = {
            "matchingDimensions": matching_dimensions,
            "identicalBytes": day_hash == night_hash,
            "nightDarker": night_record["luminance"] < day_record["luminance"],
            "perceptualDifference": difference,
            "differencePass": difference is not None and difference >= 10,
        }
        day_record["pairChecks"] = checks
        night_record["pairChecks"] = checks
        if not all((matching_dimensions, day_hash != night_hash, checks["nightDarker"], checks["differencePass"])):
            day_record["status"] = night_record["status"] = "pair-validation-failed"

duplicates = {digest: files for digest, files in hashes.items() if len(files) > 1}
for record in records:
    if record.get("sha256") in duplicates:
        record["status"] = "duplicate-source-master"

report = {
    "root": str(ROOT),
    "expected": 12,
    "received": sum("sha256" in record for record in records),
    "missing": sum(record["status"] == "missing-source-master" for record in records),
    "duplicates": duplicates,
    "records": records,
    "automatedApproval": {
        "owner": False,
        "cultural": False,
        "rights": False,
        "landmark": False,
        "launch": False,
    },
}
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps({key: report[key] for key in ("expected", "received", "missing")}, indent=2))
