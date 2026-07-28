Universal Marble & Granite — phillyumg.com
Static website for Universal Marble & Granite, a kitchen & bath design showroom at 233 W Lehigh Ave, Philadelphia. Plain HTML/CSS/JS — no framework, no build step.

Live site: https://www.phillyumg.com


How deployment works
The site deploys from the umg_pages_bundle/ folder of this repo (set as the Root Directory in Vercel).
Any push to the main branch automatically deploys to production within about a minute. There is no separate "publish" step.
Vercel project settings: Framework Preset "Other", no build command, no environment variables.
.vercelignore (inside umg_pages_bundle/) excludes unreferenced/original media files from deploys to keep them small. If you add new images, you don't need to touch it — it only lists files that should not deploy.
Folder structure
umg_pages_bundle/

├── index.html            Home page

├── about.html            About + policies/terms

├── cabinets.html         Cabinet collection

├── countertops.html      Countertop surfaces

├── finishes.html         Tile, flooring & finishes

├── gallery.html          Project gallery (lightbox)

├── slab-warehouse.html   Slab warehouse tour page

├── 404.html              Not-found page

├── script.js             All site JavaScript (nav, carousels, gallery lightbox, journey accordion)

├── styles/style.css      All site CSS (single file)

├── site.webmanifest      PWA/manifest metadata

├── .vercelignore         Files excluded from deployment

└── images/               All images and video

    ├── gallery/          Gallery photos (new ones are proj-<project>-<desc>.webp)

    ├── granitesale/      Summer sale swatch images

    ├── cabinets/         Cabinet door swatches

    ├── icons/            Small UI icons

    ├── jasper/           Slab warehouse photos/video

    └── vss/              Vessel sink photos
Making changes
Clone the repo (GitHub Desktop or git clone), edit files in umg_pages_bundle/, commit, push to main. Done — Vercel redeploys automatically.
Small text fixes can be made directly on github.com (pencil icon on any file).
⚠️ The cache-version convention (important)
CSS and JS are referenced with a version query string, e.g.:

<link rel="stylesheet" href="./styles/style.css?v=20260714" />

<script src="script.js?v=20260714"></script>

Whenever you edit style.css or script.js, bump this number in ALL html files (any new unique value works — the convention is the date, e.g. ?v=20260715). A find-and-replace across the .html files takes seconds. If you skip this, returning visitors may see the old styling from their browser cache.

Images use the same pattern (?v=) but only need a bump if you replace an existing image file with new content under the same filename.
Adding gallery images
Convert photos to WebP, max ~1920px on the long side (keeps files ~150–300 KB).
Drop them in images/gallery/ and copy an existing <div class="gallery-item"> block in gallery.html, updating src, width, height, and a descriptive alt.
Keep loading="lazy" decoding="async" on the tag.
Conventions & notes
Design system: brand colors #735c5a (mauve/brown), #c9a961 / #8b7355 (brass/gold), background #f8f5f1. Headings are Georgia serif; hero titles use the Cinzel Google Font.
Analytics: two trackers are installed on every page — Vercel Web Analytics (/_vercel/insights/script.js, viewable in the Vercel dashboard → Analytics) and a Google Ads tag (AW-18125632206).
SEO: each page has meta description, OpenGraph/Twitter tags, canonical URL, and JSON-LD structured data (business info, hours). If the business hours change, update the JSON-LD in index.html and the visible text in the Showroom section.
Sale content: the summer sale promo bar and carousel live in index.html (.promo-bar and #granite-sale section). Slab counts/prices are hard-coded there.
Accounts involved (ownership checklist)
What
Where
Notes
Code
GitHub org Philly-UMG
Owned by the phillyumg GitHub account
Hosting
Vercel "Philly UMG" account
Deploys from this repo; domain attached here
Domain (phillyumg.com)
Registered at Wix
DNS managed in the Wix dashboard; A record + www CNAME point at Vercel — don't change them
Google Ads tag
Google account
Tag ID AW-18125632206
Business email
PhillyUMG@gmail.com
Recovery/owner address for the accounts above


All of the above should stay under company-controlled logins (PhillyUMG@gmail.com), not any individual employee's personal account.

