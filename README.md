# Infinia Calendar

Private Google Calendar–backed course calendar for Infinia Academy, derived from the October 2026 calendar UI.

Target GitHub Pages site:

`https://infinia-academy.github.io/Infinia-calendar/`

## What this build does

- Reads the timetable from a **private Google Calendar before rendering**.
- Uses Google Identity Services with `calendar.readonly` and restricts access to the configured Google account.
- Keeps the internal website login separate from Google authorization.
- Uses the October calendar visual language for the main calendar and the **Course Price / quotation** experience.
- Quotation opens with all pathways/levels and all eligible lesson slots selected.
- Quotation has editable **Start date** and **Finish date** fields.
- Extending the quotation dates outside the currently viewed month triggers a live Google Calendar fetch for that range.
- Levels/pathways can be selected or unselected: P4, P5, P6, M1, M2, M3, M4, M5, Others.
- Individual lesson pills can be selected or unselected directly in the compact quotation calendar.
- Clashing lessons at the same date/time render **side-by-side**, matching the October Course Price calendar pattern.
- Price, hours, selected-period count, subtotal, automatic discount, and final total update immediately.
- No MPF/MFC/EFC controls.

## Teacher colors

- Kru Tuang: light pink
- Kru Boom: yellow
- Kru Lek: orange
- Kru Mint: light pink
- Kru Baipak: blue
- Kru Base: green

## Hourly pricing (THB)

- P4 or below: 106/hour
- P5: 111/hour
- P6: 122/hour
- M1: 133/hour
- M2: 144/hour
- M3 or above: 156/hour

Special event-title prefixes override the school-level rate:

- `Kicker`: 500/hour
- `Fast`: 500/hour
- `Inkjet`: 400/hour
- `Peak`: 500/hour
- `P4 B`: 200/hour
- `AFAPS`: 200/hour

Automatic discounts:

- subtotal >= 5,000 THB → 10%
- subtotal >= 10,000 THB → 15%

## Event detection

Examples:

- `P5 Math - Kru Lek`
- `M2 English | Kru Boom`
- `Kicker Private - Kru Base`
- `P4 B Science - Kru Mint`

The title is used for level and special-rate detection. Teacher detection checks title, description, and optional Calendar extended property `teacher`.

`Others` means the title contains no `Px` or `Mx` token. For filtering, P1–P4 are grouped into P4 and M5+ into M5; pricing still follows P4-or-below and M3-or-above rules.

## Google configuration already expected

OAuth Web Client ID is configured in `config.js`.

Authorized JavaScript origins should include:

- `https://infinia-academy.github.io`
- `http://localhost:8000` for local testing

Required OAuth scope:

`https://www.googleapis.com/auth/calendar.readonly`

Changing the repository path from the old Term 2 name to `Infinia-calendar` does **not** require another OAuth JavaScript origin because the origin remains `https://infinia-academy.github.io`.

## Local test

```bash
cd ~/Downloads
unzip -o Infinia-calendar.zip
cd Infinia-calendar
python3 -m http.server 8000
```

Open:

`http://localhost:8000/`

If an older service-worker version is visible, hard-refresh once with `Command + Shift + R`.

## Create the GitHub repository

```bash
cd ~/Downloads/Infinia-calendar

git init
git branch -M main
git add .
git commit -m "Initial Infinia Calendar"

gh repo create infinia-academy/Infinia-calendar \
  --public \
  --source=. \
  --remote=origin \
  --push
```

Then open the repository on GitHub:

1. Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main`
4. Folder: `/ (root)`
5. Save

Expected URL:

`https://infinia-academy.github.io/Infinia-calendar/`

## If an old repository already exists locally

If you already initialized/pushed the previous `term-2-calendar` folder, it is cleaner to use this renamed folder as the new repository. Do not accidentally push both histories to the same Pages repository unless you intend to migrate it.

## Website password

Only the SHA-256 verifier is stored in `config.js`; the plaintext website password is not committed.

To change it later:

```bash
python3 - <<'PY'
import hashlib, getpass
p = getpass.getpass('New website password: ')
print(hashlib.sha256(p.encode()).hexdigest())
PY
```

Replace `websiteLoginPasswordSha256` in `config.js` with the output.

## Security boundary

The website login is a lightweight client-side gate. The private data boundary remains Google OAuth: without a valid short-lived Calendar token for the allowed Google account, private events cannot be fetched. Google API/OAuth responses are never service-worker cached.


## Quotation PNG export

The quotation panel includes **Copy PNG** and **Download PNG** controls. The PNG is rendered as a clean high-resolution customer quotation from the currently selected date range, pathways, lesson slots, and live pricing totals. Clipboard copy falls back to a PNG download if the browser blocks image clipboard access.


## Parent message copy

The quotation panel includes **Copy Message**. It prompts for the student name, sender gender (male/female), and whether pricing should be included. The generated Thai message uses only the currently selected lesson slots and date range, groups lessons by day, and copies the result to the clipboard. When pricing is enabled it also includes total periods/hours, subtotal, any automatic discount, final payment, and the configured Kasikorn bank details.


## Latest quotation export updates

- Student name(s) field adds the rendered title `ตารางเรียน <start - end> ของน้อง <name>`.
- Schedule event pills and fonts are approximately 2x larger/taller in the quotation preview and PNG export.
- PNG export remains at 4x canvas scale.
- Subject pills, manual integer discount, date codes such as `2 MON`, and Hide Price schedule-only export remain supported.
