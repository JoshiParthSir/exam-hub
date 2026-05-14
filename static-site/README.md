# Gujarat University Practical Exam Centres — Static Site

A single-file static page. Zero build, zero backend.

## Deploy

### Vercel
1. Drag-and-drop this `static-site/` folder at https://vercel.com/new
2. Or run: `npx vercel --prod` from inside this folder
3. Done — no framework preset needed.

### Netlify
1. Drag-and-drop this folder at https://app.netlify.com/drop
2. Or connect a repo and set **Publish directory** to `static-site`. Build command: leave empty.

### GitHub Pages
1. Push the contents of this folder to a repo (or `/docs` folder).
2. Settings → Pages → Branch: `main`, folder: `/ (root)` or `/docs`.

### Anywhere else
Upload `index.html` to any static host (Cloudflare Pages, S3, Firebase Hosting, even a USB stick).

## QR Code
Point any QR generator at the deployed URL.
