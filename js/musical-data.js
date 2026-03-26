(() => {
    const PERIOD_MAP = {
        "1": "1교시 (09:00~)",
        "2": "2교시 (09:50~)",
        "3": "3교시 (10:40~)",
        "4(4,5,6G)": "4교시 (11:30~)",
        "4(1,2,3G)": "4교시 (12:10~)",
        "5": "5교시 (13:00~)",
        "6": "6교시 (13:50~)"
    };

    function parseCsv(text) {
        const rows = [];
        let row = [];
        let value = "";
        let inQuotes = false;

        for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            const next = text[i + 1];

            if (ch === '"') {
                if (inQuotes && next === '"') {
                    value += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
                continue;
            }

            if (ch === "," && !inQuotes) {
                row.push(value.trim());
                value = "";
                continue;
            }

            if ((ch === "\n" || ch === "\r") && !inQuotes) {
                if (ch === "\r" && next === "\n") i++;
                row.push(value.trim());
                rows.push(row);
                row = [];
                value = "";
                continue;
            }

            value += ch;
        }

        if (value.length > 0 || row.length > 0) {
            row.push(value.trim());
            rows.push(row);
        }

        return rows;
    }

    function isWeekLabel(value) {
        return /^\d{1,2}\.\d{1,2}~$/.test(value || "");
    }

    function parseWeekStartDate(label) {
        const match = /^(\d{1,2})\.(\d{1,2})~$/.exec(label || "");
        if (!match) return null;

        const month = Number(match[1]);
        const day = Number(match[2]);
        // 프로젝트 기준(2026년 운영): 3~12월은 2026, 1~2월은 2027로 본다
        const year = month >= 3 ? 2026 : 2027;
        return new Date(year, month - 1, day);
    }

    function toDateStr(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    }

    function parseEntryCell(raw) {
        const value = (raw || "").trim();
        if (!value) return null;

        if (value.includes("방학") || value.includes("연휴") || value.includes("종업식")) {
            return null;
        }

        const classMatch = /^([1-6])-([1-9])$/.exec(value);
        if (classMatch) {
            return {
                grade: `${classMatch[1]}학년`,
                classNum: `${classMatch[2]}반`,
                source: value
            };
        }

        const gayageumMatch = /^([1-6])G\s*가야금$/.exec(value);
        if (gayageumMatch) {
            return {
                grade: `${gayageumMatch[1]}학년`,
                classNum: "전",
                source: value
            };
        }

        return null;
    }

    function parseSide(rows, labelRowIdx, baseCol) {
        const label = (rows[labelRowIdx] && rows[labelRowIdx][baseCol]) || "";
        const weekStart = parseWeekStartDate(label);
        if (!weekStart) return [];

        const results = [];
        for (let r = labelRowIdx + 1; r < rows.length; r++) {
            const row = rows[r] || [];
            const firstCol = (row[baseCol] || "").trim();
            const otherSideFirstCol = (row[baseCol === 0 ? 7 : 0] || "").trim();

            if (isWeekLabel(firstCol) || isWeekLabel(otherSideFirstCol)) {
                break;
            }

            const period = PERIOD_MAP[firstCol];
            if (!period) continue;

            for (let offset = 1; offset <= 5; offset++) {
                const entry = parseEntryCell(row[baseCol + offset]);
                if (!entry) continue;

                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + (offset - 1));

                results.push({
                    id: `fixed-musical-${toDateStr(date)}-${period}-${entry.grade}-${entry.classNum}`,
                    date: toDateStr(date),
                    grade: entry.grade,
                    classNum: entry.classNum,
                    period,
                    space: "뮤지컬실",
                    password: "",
                    createdAt: null,
                    isFixed: true,
                    source: entry.source
                });
            }
        }

        return results;
    }

    async function loadFixedMusicalReservations() {
        const res = await fetch("/public/musical.xlsx.csv");
        if (!res.ok) throw new Error("뮤지컬 CSV 로드 실패");

        const csv = await res.text();
        const rows = parseCsv(csv);
        const all = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i] || [];
            if (isWeekLabel(row[0])) all.push(...parseSide(rows, i, 0));
            if (isWeekLabel(row[7])) all.push(...parseSide(rows, i, 7));
        }

        const seen = new Set();
        return all.filter((item) => {
            const key = `${item.date}|${item.space}|${item.period}|${item.grade}|${item.classNum}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    window.loadFixedMusicalReservations = loadFixedMusicalReservations;
})();
