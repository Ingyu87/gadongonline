"""Move 1-2 class from Tuesday 1st period to Tuesday 5th period in musical CSV."""
import re
import io
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATHS = [
    ROOT / "public" / "musical.xlsx.csv",
    ROOT / "2026 가동 뮤지컬실 사용대장.xlsx - 시트1.csv",
]


def parse_csv_lines(text):
    rows = []
    row = []
    value = ""
    in_quotes = False
    i = 0
    while i < len(text):
        ch = text[i]
        next_ch = text[i + 1] if i + 1 < len(text) else ""
        if ch == '"':
            if in_quotes and next_ch == '"':
                value += '"'
                i += 2
                continue
            in_quotes = not in_quotes
            i += 1
            continue
        if ch == "," and not in_quotes:
            row.append(value)
            value = ""
            i += 1
            continue
        if ch in ("\n", "\r") and not in_quotes:
            if ch == "\r" and next_ch == "\n":
                i += 2
            else:
                i += 1
            row.append(value)
            rows.append(row)
            row = []
            value = ""
            continue
        value += ch
        i += 1
    if value or row:
        row.append(value)
        rows.append(row)
    return rows


def is_week_label(v):
    return bool(re.match(r"^\d{1,2}\.\d{1,2}~$", (v or "").strip()))


def is_holiday(v):
    v = (v or "").strip()
    return any(k in v for k in ("방학", "연휴", "종업식", "설연휴"))


def write_csv(rows):
    out = io.StringIO()
    for row in rows:
        cells = []
        for c in row:
            c = c if c is not None else ""
            if any(x in c for x in [",", '"', "\n", "\r"]):
                cells.append('"' + c.replace('"', '""') + '"')
            else:
                cells.append(c)
        out.write(",".join(cells) + "\n")
    return out.getvalue()


def week_block_end(rows, start):
    r = start + 1
    while r < len(rows):
        wrow = rows[r]
        fc0 = (wrow[0] if len(wrow) > 0 else "").strip()
        fc7 = (wrow[7] if len(wrow) > 7 else "").strip()
        if is_week_label(fc0) or is_week_label(fc7):
            break
        r += 1
    return r


def update_side(rows, start, end, base, changes):
    had_tue_12_p1 = False
    for r in range(start + 1, end):
        wrow = rows[r]
        period = (wrow[base] if len(wrow) > base else "").strip()
        tue_col = base + 2
        wed_col = base + 3
        if len(wrow) <= tue_col:
            continue
        tue = (wrow[tue_col] or "").strip()
        wed = (wrow[wed_col] if len(wrow) > wed_col else "").strip()

        if period == "1" and tue == "1-2":
            had_tue_12_p1 = True
            wrow[tue_col] = ""
            changes.append(f"line {r + 1}: remove 1-2 from Tue 1교시 (side {base})")

        if period == "5":
            if is_holiday(tue) or is_holiday(wed):
                continue
            if wed == "1-2":
                wrow[wed_col] = ""
                changes.append(f"line {r + 1}: remove 1-2 from Wed 5교시 (side {base})")
            if had_tue_12_p1 or base == 7:
                if tue != "1-2":
                    wrow[tue_col] = "1-2"
                    changes.append(f"line {r + 1}: set 1-2 on Tue 5교시 (side {base})")


def update_rows(rows):
    changes = []
    i = 0
    while i < len(rows):
        row = rows[i]
        for base in (0, 7):
            label = (row[base] if len(row) > base else "").strip()
            if not is_week_label(label):
                continue
            end = week_block_end(rows, i)
            update_side(rows, i, end, base, changes)
        i += 1
    return changes


def main():
    for path in CSV_PATHS:
        text = path.read_text(encoding="utf-8")
        rows = parse_csv_lines(text)
        changes = update_rows(rows)
        path.write_text(write_csv(rows), encoding="utf-8")
        print(f"{path.name}: {len(changes)} changes")
        for c in changes[:20]:
            print(f"  {c}")
        if len(changes) > 20:
            print(f"  ... and {len(changes) - 20} more")


if __name__ == "__main__":
    main()
