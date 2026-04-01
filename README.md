# PPRZ.PH — Paparazzzzzi Website

**For Kyle** — everything you need to deploy and manage the site.

---

## 🗂 File Structure

```
pprz-site/
├── index.html          ← Main website
├── css/
│   └── style.css       ← All styles (CSS custom properties for easy editing)
├── js/
│   └── main.js         ← Animations, scroll effects, interactions
├── admin/
│   ├── config.yml      ← Netlify CMS configuration
│   └── index.html      ← CMS admin panel
├── images/
│   └── uploads/        ← Uploaded images go here (via CMS)
├── _data/              ← CMS data files (created when you edit via admin)
├── netlify.toml        ← Netlify deployment config
└── README.md           ← This file
```

---

## 🚀 Deploy to Netlify

### Option A — Netlify Drop (Fastest, no GitHub needed)
1. Go to **[app.netlify.com](https://app.netlify.com)**
2. Sign up / log in
3. Drag the entire `pprz-site/` folder onto the **"Deploy manually"** drop zone
4. Your site goes live instantly with a `*.netlify.app` URL
5. You can rename the site URL in: Site Settings → General → Site name

### Option B — GitHub + Netlify (Recommended for CMS)
See the GitHub section below, then connect via Netlify.

---

## 🐙 Connect GitHub Repo (kylelagundph)

### Step 1 — Push to GitHub
```bash
# From inside pprz-site/
cd /path/to/pprz-site

git init
git add .
git commit -m "Initial commit — PPRZ.PH website"

# Create repo on GitHub (go to github.com/kylelagundph → New repository)
# Name it: pprz-ph  (or pprz-site)
# Keep it public

git remote add origin https://github.com/kylelagundph/pprz-ph.git
git branch -M main
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to **[app.netlify.com](https://app.netlify.com)** → "Add new site" → "Import an existing project"
2. Choose **GitHub** → Authorize Netlify
3. Select the `pprz-ph` repo
4. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.`
5. Click **"Deploy site"** — done! ✅

Every time you push to `main` on GitHub, Netlify auto-deploys.

---

## ✏️ Using the CMS Admin

The CMS lets you edit content without touching code.

### Step 1 — Enable Netlify Identity
1. In Netlify dashboard → your site → **Identity** tab
2. Click **"Enable Identity"**
3. Under **Registration**, set to **"Invite only"**
4. Click **"Invite users"** → enter your email
5. Check your email → accept invite → set password

### Step 2 — Enable Git Gateway
1. In Netlify dashboard → Identity → **Services** → **Git Gateway**
2. Click **"Enable Git Gateway"**
   This lets the CMS commit changes to your GitHub repo.

### Step 3 — Access the Admin
1. Go to: `https://your-site.netlify.app/admin/`
2. Log in with your Netlify Identity account
3. You can now edit:
   - **Site Settings** — name, tagline, email, social links
   - **Hero Section** — big title, eyebrow text, tagline
   - **About Section** — bio text, stats
   - **Services** — add/remove/reorder services
   - **Portfolio Projects** — add new projects, upload photos, set categories

### Local Dev (offline editing)
```bash
# Install proxy server
npm install -g netlify-cms-proxy-server

# In pprz-site/ root:
npx netlify-cms-proxy-server &

# Then open: http://localhost:8080/admin/
# (You'll also need a local server for the main site)
npx serve . -p 8080
```

In `admin/config.yml`, uncomment `local_backend: true` for local dev.

---

## 🎨 Customizing Styles

Open `css/style.css` — all colours and fonts are at the top in CSS variables:

```css
:root {
  --color-bg: #0a0a0a;          /* Background */
  --color-accent: #FFD700;      /* Yellow accent */
  --color-text: #ffffff;        /* Main text */
  --font-display: 'Bebas Neue'; /* Headings font */
  --font-body: 'Inter';         /* Body font */
}
```

Change `--color-accent` to any colour to re-theme the whole site instantly.

---

## 🖼 Adding Real Photos

1. Replace portfolio card placeholders: add `<img>` tags inside `.portfolio-card__image`
2. Or use the CMS to upload photos per project
3. Recommended image sizes:
   - Portfolio cards: **800 × 1000px** (portrait 4:5)
   - About photo: **600 × 800px**

---

## 📱 What's Already Built

- ✅ Sticky navigation (transparent → solid on scroll)
- ✅ Mobile hamburger menu with animations
- ✅ Full-viewport hero with PAPARAZZZZZI display text
- ✅ Scrolling marquee strip (service names)
- ✅ Portfolio grid (3-col desktop, 2-col tablet, 1-col mobile)
- ✅ Card hover effects (scale + overlay)
- ✅ About section with stats counter
- ✅ Services section — pill tags + big list
- ✅ CTA footer: "LET'S SHOOT TOGETHER"
- ✅ Smooth scroll
- ✅ Fade-in scroll reveal animations
- ✅ Cursor glow effect (desktop)
- ✅ Page loader
- ✅ Netlify CMS admin
- ✅ Mobile responsive
- ✅ Accessibility (aria labels, keyboard nav)

---

## 🌐 Custom Domain (pprz.ph)

1. Buy `pprz.ph` from a Philippine domain registrar (e.g., Dot PH, Namecheap)
2. In Netlify → Domain settings → Add custom domain → `pprz.ph`
3. Update your domain's DNS:
   - Add **CNAME** record: `www` → `your-site.netlify.app`
   - Add **A** record: `@` → `75.2.60.5`
4. Netlify auto-provisions SSL (HTTPS) — takes ~10 minutes

---

## 📞 Support

Built by Ken (OpenClaw) for Kyle. For help, just ask via WhatsApp.

---

*PPRZ.PH — Paparazzzzzi. For Your Event. 📸*
