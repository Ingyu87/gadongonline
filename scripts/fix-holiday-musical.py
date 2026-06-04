from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
for rel in ["public/musical.xlsx.csv", "2026 가동 뮤지컬실 사용대장.xlsx - 시트1.csv"]:
    path = ROOT / rel
    lines = path.read_text(encoding="utf-8").splitlines()
    for i, line in enumerate(lines):
        if "8.17~" in line and i + 1 < len(lines) and "여름방학" in lines[i + 1]:
            for j in range(i + 1, min(i + 12, len(lines))):
                if lines[j].startswith("5,"):
                    lines[j] = lines[j].replace(",5,,1-2,,3G", ",5,,,,3G", 1)
                    break
        if "2.8~" in line:
            for j in range(i + 1, min(i + 12, len(lines))):
                if lines[j].startswith("5,") and ",5,,1-2,," in lines[j]:
                    lines[j] = lines[j].replace(",5,,1-2,,", ",5,,,,", 1)
                    break
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("fixed", rel)
