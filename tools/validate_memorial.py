#!/usr/bin/env python3
from pathlib import Path
import json,re,sys

ROOT=Path(__file__).resolve().parents[1]
PEOPLE_JS=ROOT/'assets/js/people.js'
text=PEOPLE_JS.read_text(encoding='utf-8')
m=re.search(r'window\.MEMORIAL_PEOPLE\s*=\s*(\[.*\])\s*;?\s*$',text,re.S)
if not m:
    raise SystemExit('FAIL: could not parse assets/js/people.js')
people=json.loads(m.group(1))
errors=[]
ids=set()
for p in people:
    pid=p.get('id','')
    if not pid: errors.append('record without id'); continue
    if pid in ids: errors.append(f'duplicate id: {pid}')
    ids.add(pid)
    if p.get('page') != f'people/{pid}/': errors.append(f'{pid}: unexpected page path {p.get("page")}')
    loader=ROOT/'people'/pid/'index.html'
    if not loader.exists():
        errors.append(f'{pid}: missing loader')
    else:
        html=loader.read_text(encoding='utf-8')
        if f'data-person-id="{pid}"' not in html: errors.append(f'{pid}: loader id mismatch')
        required='../../assets/js/person-bootstrap.js'
        if required not in html: errors.append(f'{pid}: missing bootstrap script {required}')
        for forbidden in ('assets/css/site.css','gallery-viewer.js','person-template.js','../../assets/js/people.js','../../assets/js/person-page.js'):
            if forbidden in html: errors.append(f'{pid}: legacy/direct person-page dependency remains: {forbidden}')
    refs=[]
    if p.get('image'): refs.append(p['image'])
    refs.extend(x.get('src','') for x in p.get('storyMedia',[]))
    refs.extend(p.get('memorialQr') or [])
    for ref in refs:
        if ref.startswith('assets/') and not (ROOT/ref).exists(): errors.append(f'{pid}: missing asset {ref}')
    story=p.get('story') or {}
    valid_sections={'personal','event','legacy'}
    seen_media=set()
    for media in p.get('storyMedia',[]):
        section=media.get('section')
        if section not in valid_sections: errors.append(f'{pid}: invalid media section {section}')
        para_count=len(story.get(section) or [])
        after=media.get('afterParagraph')
        if not isinstance(after,int) or after < 1 or after > para_count: errors.append(f'{pid}: invalid image position {section}/{after} of {para_count}')
        key=(media.get('src'),section,after)
        if key in seen_media: errors.append(f'{pid}: duplicate story media {key}')
        seen_media.add(key)
    if p.get('isPreviousYears') and '7.10' in str(story.get('eventHeading') or ''):
        errors.append(f'{pid}: previous-years record must never use a 7.10 event heading')
    if story.get('event'):
        expected='יום הנפילה והנסיבות' if p.get('isPreviousYears') else 'שבת ה7.10.2023'
        if story.get('eventHeading') != expected: errors.append(f'{pid}: event heading is {story.get("eventHeading")!r}, expected {expected!r}')
    paragraphs=[]
    for key in ('personal','event','legacy'):
        paragraphs.extend(story.get(key) or [])
    seen=set()
    for paragraph in paragraphs:
        if paragraph in seen: errors.append(f'{pid}: duplicate biography paragraph: {paragraph[:60]}')
        seen.add(paragraph)


bootstrap=ROOT/'assets/js/person-bootstrap.js'
if not bootstrap.exists(): errors.append('missing assets/js/person-bootstrap.js')
else:
    b=bootstrap.read_text(encoding='utf-8')
    for required in ('js/people.js','js/person-page.js','site-version.json'):
        if required not in b: errors.append(f'bootstrap missing reference to {required}')
version_file=ROOT/'assets/site-version.json'
if not version_file.exists(): errors.append('missing assets/site-version.json')
else:
    try:
        version=json.loads(version_file.read_text(encoding='utf-8')).get('version')
        if not version: errors.append('site-version.json has no version')
    except Exception as exc:
        errors.append(f'invalid site-version.json: {exc}')

loaders=list((ROOT/'people').glob('*/index.html'))
if len(loaders)!=len(people): errors.append(f'loader count {len(loaders)} != people count {len(people)}')
if errors:
    print(f'FAIL: {len(errors)} issue(s)')
    for e in errors: print('-',e)
    sys.exit(1)
print(f'PASS: {len(people)} records; {len(loaders)} stable loaders; all local referenced assets exist.')
print(f'PASS: {sum(bool(p.get("story")) for p in people)} structured biographies; {sum(len(p.get("storyMedia",[])) for p in people)} story images.')
print('PASS: current-period event headings and previous-years event headings are consistent.')
