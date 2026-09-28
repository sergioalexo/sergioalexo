"""Refresh the "Upcoming gigs" block in README.md from sergioalexo.com/events.

The events page is server-rendered by Next.js, so the upcoming events are in
its __NEXT_DATA__ JSON. Only the text between the GIGS markers is rewritten.
Stdlib only, so the workflow needs no installs.
"""
import json
import re
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

SITE = "https://www.sergioalexo.com"
README = Path(__file__).resolve().parent.parent / "README.md"
START, END = "<!-- GIGS:START -->", "<!-- GIGS:END -->"
MAX_GIGS = 5


def fetch_events():
    req = urllib.request.Request(f"{SITE}/events", headers={"User-Agent": "sergioalexo-readme"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
    m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html, re.S)
    if not m:
        raise RuntimeError("no __NEXT_DATA__ on /events")
    props = json.loads(m.group(1))["props"]["pageProps"]
    if props.get("mode") != "upcoming":
        raise RuntimeError("unexpected events page mode")
    return props["events"]


def when(e):
    start = datetime.fromisoformat(e["startDate"])  # keeps the venue's UTC offset
    hour = start.strftime("%I").lstrip("0")
    minutes = start.strftime(":%M") if start.minute else ""
    return f"{start:%a, %b} {start.day} · {hour}{minutes} {start:%p}"


def title(e):
    return re.sub(r"^[A-Z][a-z]{2,8}\.? \d{1,2}:\s*", "", e["title"]).strip()  # drop "Oct 30: " prefix


def tickets(e):
    url = e["ticketUrl"].rstrip("?")
    if e.get("soldOut"):
        return "Sold out"
    lo, cur = e.get("priceMin"), e.get("currency") or ""
    label = f"From ${lo:.2f} {cur}".strip() if lo else "Tickets"
    return f"[{label}]({url})"


def cell(text):
    return text.replace("|", "\\|")


def render(events):
    if not events:
        return (
            "No gigs announced right now. Follow [@sergioalexoo](https://instagram.com/sergioalexoo) "
            f"or check [sergioalexo.com/events]({SITE}/events) for new dates."
        )
    rows = ["| Date | Event | Venue | Tickets |", "|---|---|---|---|"]
    for e in sorted(events, key=lambda e: e["startDate"])[:MAX_GIGS]:
        venue = ", ".join(x for x in (e.get("venue"), e.get("city")) if x)
        rows.append(
            f"| {when(e)} | [{cell(title(e))}]({SITE}/events/{e['slug']}) | {cell(venue)} | {tickets(e)} |"
        )
    rows.append("")
    rows.append(f"All dates → [sergioalexo.com/events]({SITE}/events)")
    return "\n".join(rows)


def main():
    text = README.read_text(encoding="utf-8")
    if START not in text or END not in text:
        sys.exit("GIGS markers missing from README.md")
    block = f"{START}\n{render(fetch_events())}\n{END}"
    new = re.sub(re.escape(START) + r".*?" + re.escape(END), lambda _: block, text, flags=re.S)
    if new != text:
        README.write_text(new, encoding="utf-8")
        print("README updated")
    else:
        print("no change")


if __name__ == "__main__":
    main()
