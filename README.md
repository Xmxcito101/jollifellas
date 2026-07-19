# 🎉 Jollifellas — Lagos Weekend AI Planner

AI-powered weekend curator for Lagos. Tell it your mood, your area, and your vibe — it builds your perfect day.

---

## 🚀 HOW TO GO LIVE — 3 Steps

### STEP 1 → Upload to GitHub

1. Go to **github.com** and sign up for a free account
2. Click the **+** button (top right) → **"New repository"**
3. Name it `jollifellas` → click **"Create repository"**
4. On the next page, click **"uploading an existing file"**
5. Open the `jollifellas` folder on your computer
6. **Select ALL files and folders inside it** → drag them into the GitHub upload box
7. Scroll down → click **"Commit changes"**

✅ Your code is now on GitHub.

---

### STEP 2 → Add your AI key to Vercel

1. Go to **console.anthropic.com** → sign up → click **"API Keys"** → **"Create Key"**
2. Copy the key (it starts with `sk-ant-...`) — save it somewhere safe

---

### STEP 3 → Deploy on Vercel

1. Go to **vercel.com** → sign up with your GitHub account
2. Click **"Add New Project"**
3. Click **"Import"** next to `jollifellas`
4. Scroll down to **"Environment Variables"** — add this:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your key from Step 2
   - Click **Add**
5. Click **"Deploy"**

⏱️ Wait ~60 seconds → your site is LIVE at `https://jollifellas.vercel.app`

---

## 🌍 Custom Domain (optional)

Want `jollifellas.com` instead?

1. Buy the domain at Namecheap or GoDaddy
2. In Vercel → your project → **Settings → Domains** → type `jollifellas.com`
3. Copy the DNS records Vercel gives you → paste them into your domain registrar
4. Wait 10–30 minutes → done

---

## 🔄 Future Updates

Every time you want to update the site:

1. Go to your repo on github.com
2. Click the file you want to change → click the ✏️ pencil icon → edit → **"Commit changes"**
3. Vercel auto-deploys the update in under 60 seconds

---

Built with Next.js · Claude AI · Deployed on Vercel
