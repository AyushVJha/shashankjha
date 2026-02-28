# shashankjha.in — Official Website

Personal website for **Advocate Shashank Shekhar Jha** — Supreme Court of India lawyer, PIL filer, TV panelist, and public figure.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Resend** (contact form emails)
- **next-sitemap** (SEO)
- **Lucide React** (icons)
- **Zod** (validation)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone <repo-url>
cd shashankjha
npm install
```

### Environment Variables

Copy the example env file and add your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
RESEND_API_KEY=re_your_key_here
SITE_URL=https://shashankjha.in
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Content Management

All content is managed through TypeScript files in `/src/data/`. No CMS needed — just edit the files and redeploy.

### 📋 Adding New Cases

Edit `src/data/cases.ts`:

```typescript
{
  id: "unique-slug",
  title: "Case Title",
  court: "Supreme Court of India",
  year: 2025,
  status: "Filed",  // "Ongoing" | "Filed" | "Disposed" | "Landmark" | "Dismissed" | "Withdrawn for refiling"
  category: ["PIL", "Supreme Court"],  // Used for filtering
  description: "Short description (shown on card)",
  fullDescription: "Full description (shown in modal)",
}
```

### 📺 Adding YouTube Videos

Edit `src/data/videos.ts`:

```typescript
{
  id: "video-1",
  youtubeId: "dQw4w9WgXcQ",  // The ID from YouTube URL
  title: "Video Title",
  description: "Optional description",
}
```

### 📰 Adding News Coverage

Edit `src/data/news.ts`:

```typescript
{
  id: "unique-id",
  headline: "Article headline",
  publication: "Publication Name",
  date: "Month Year",
  url: "https://link-to-article.com",
}
```

### 📢 Updating the Ticker

Edit `src/data/ticker.ts` — it's a simple array of strings:

```typescript
export const tickerItems: string[] = [
  "Your new ticker item here",
  // ...
];
```

### 🐦 Updating Featured Tweet

Edit `src/data/featured-tweet.ts`:

```typescript
export const featuredTweet = {
  text: "Tweet text here",
  date: "Feb 15, 2026",
  likes: "12.4K",
  retweets: "3.8K",
  replies: "1.2K",
  views: "1.1M",
  url: "https://twitter.com/shashank_ssj/status/...",
};
```

### 📝 Adding Blog Posts

Add a new entry to the `blogPosts` object in `src/app/blog/[slug]/page.tsx`:

```typescript
"your-post-slug": {
  slug: "your-post-slug",
  title: "Post Title",
  date: "Month Year",
  readTime: "X min read",
  content: `<p>Your HTML content here</p>`,
}
```

Don't forget to add it to `generateStaticParams()` return array.

### 🖼️ Replacing Photos

Replace these files in `/public/images/`:
- `shashank-hero.jpg` — Hero section photo (recommended: 640x880px)
- `shashank-about.jpg` — About section photo (recommended: 800x1060px)
- `og-image.jpg` — Social share image (recommended: 1200x630px)

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add environment variables:
   - `RESEND_API_KEY` = your Resend key
   - `SITE_URL` = `https://shashankjha.in`
4. Click **Deploy**

### 3. Connect Custom Domain

1. In Vercel dashboard → Settings → Domains
2. Add `shashankjha.in`
3. Update your domain's DNS:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for `www`)
4. Wait for DNS propagation (usually 5-30 minutes)

---

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── blog/[slug]/page.tsx    # Blog post pages
│   ├── globals.css             # Global styles & Tailwind config
│   ├── layout.tsx              # Root layout with SEO/metadata
│   └── page.tsx                # Home page (all sections)
├── components/
│   ├── Navbar.tsx              # Sticky glassmorphism navbar
│   ├── Hero.tsx                # Hero with stats counter
│   ├── Ticker.tsx              # Auto-scrolling news ticker
│   ├── TwitterFeed.tsx         # Live X feed + featured tweet
│   ├── Cases.tsx               # Filterable cases gallery
│   ├── MediaRoom.tsx           # News + video tabs
│   ├── Expertise.tsx           # 8 expertise cards
│   ├── About.tsx               # Bio + timeline
│   ├── Blog.tsx                # Blog preview cards
│   ├── Contact.tsx             # Contact form + info
│   └── Footer.tsx              # Footer with socials
└── data/
    ├── cases.ts                # All legal cases
    ├── news.ts                 # Media coverage
    ├── videos.ts               # YouTube video IDs
    ├── ticker.ts               # Ticker items
    └── featured-tweet.ts       # Pinned tweet data
```

## Security Features

- Honeypot field in contact form (bot trap)
- CSP headers in next.config.ts
- Input sanitization on all form fields
- Rate limiting (5 submissions/IP/hour)
- All secrets in .env.local (not committed)
- No sensitive data in client bundle

## License

All rights reserved © 2025 Shashank Shekhar Jha
