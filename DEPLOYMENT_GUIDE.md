# 🚀 MGNREGA Portal - Deployment & Localhost Guide

## 📍 **How to Run on Localhost**

### **Prerequisites:**

- Node.js installed (v18 or higher)
- npm installed

### **Step 1: Install Dependencies**

**Backend:**

```powershell
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal\backend
npm install
```

**Frontend:**

```powershell
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal\frontend
npm install
```

### **Step 2: Start Backend Server**

```powershell
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal\backend
node server.js
```

✅ Backend running on: **http://localhost:3001**

### **Step 3: Start Frontend (New Terminal)**

```powershell
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal\frontend
npm run dev
```

✅ Frontend running on: **http://localhost:3002** (or 3000)

### **Step 4: Open Browser**

Visit: **http://localhost:3002**

---

## 🌐 **Free Deployment Options**

### **Option 1: Vercel (Recommended - Easiest)**

**Best for:** Frontend + Serverless Backend

#### **Setup:**

1. **Install Vercel CLI:**

```powershell
npm install -g vercel
```

2. **Login to Vercel:**

```powershell
vercel login
```

3. **Deploy Frontend:**

```powershell
cd frontend
npm run build
vercel --prod
```

4. **Deploy Backend as Serverless Function:**

Create `backend/api/states.js`:

```javascript
// Move server.js logic here as serverless functions
module.exports = (req, res) => {
  // Your API logic
};
```

Then deploy:

```powershell
cd backend
vercel --prod
```

**Pros:**

- ✅ Free tier: Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Easy deployment

**Cons:**

- ⚠️ Serverless functions (may need to restructure backend)

**Website:** https://vercel.com

---

### **Option 2: Render (Best for Full-Stack)**

**Best for:** Backend + Frontend together

#### **Setup:**

1. **Push code to GitHub:**

```powershell
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/mgnrega-portal.git
git push -u origin main
```

2. **Go to Render.com:**

   - Sign up at https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Deploy Backend:**

   - **Name:** mgnrega-backend
   - **Root Directory:** backend
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
   - Click "Create Web Service"
   - Copy the backend URL (e.g., https://mgnrega-backend.onrender.com)

4. **Deploy Frontend:**

   - Click "New +" → "Static Site"
   - **Name:** mgnrega-frontend
   - **Root Directory:** frontend
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** dist
   - **Environment Variables:**
     - `VITE_API_URL` = `https://mgnrega-backend.onrender.com`
   - Click "Create Static Site"

5. **Update Frontend API URL:**

Edit `frontend/src/pages/StructuredHomePage.tsx`:

```typescript
// Replace http://localhost:3001 with your Render backend URL
const API_URL =
  import.meta.env.VITE_API_URL || "https://mgnrega-backend.onrender.com";

// Update fetch calls
fetch(`${API_URL}/api/states`);
```

**Pros:**

- ✅ Free tier: 750 hours/month
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS
- ✅ Supports Node.js backend directly

**Cons:**

- ⚠️ Free tier sleeps after 15 mins of inactivity
- ⚠️ May take 30s to wake up

**Website:** https://render.com

---

### **Option 3: Netlify (Frontend) + Railway (Backend)**

#### **Frontend on Netlify:**

1. **Install Netlify CLI:**

```powershell
npm install -g netlify-cli
```

2. **Build and Deploy:**

```powershell
cd frontend
npm run build
netlify deploy --prod
```

3. **Or Deploy via GitHub:**
   - Go to https://netlify.com
   - Connect GitHub repo
   - **Build Command:** `npm run build`
   - **Publish Directory:** dist

#### **Backend on Railway:**

1. **Go to Railway.app:**

   - Sign up at https://railway.app
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Select your repository

2. **Configure:**

   - **Root Directory:** backend
   - **Start Command:** `node server.js`
   - Railway will auto-detect Node.js

3. **Get Backend URL:**
   - Copy the generated URL (e.g., https://mgnrega-backend.up.railway.app)

**Pros:**

- ✅ Netlify: Unlimited bandwidth, fast CDN
- ✅ Railway: $5 free credit/month
- ✅ Both have automatic deployments

**Cons:**

- ⚠️ Need to manage two platforms

**Websites:**

- https://netlify.com
- https://railway.app

---

### **Option 4: GitHub Pages (Frontend Only) + Render (Backend)**

#### **Frontend on GitHub Pages:**

1. **Install gh-pages:**

```powershell
cd frontend
npm install --save-dev gh-pages
```

2. **Add to package.json:**

```json
{
  "homepage": "https://yourusername.github.io/mgnrega-portal",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy:**

```powershell
npm run deploy
```

4. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: gh-pages branch
   - Save

**Pros:**

- ✅ 100% Free
- ✅ Unlimited bandwidth
- ✅ Fast CDN

**Cons:**

- ⚠️ Static hosting only (no backend)
- ⚠️ Need separate backend hosting

---

### **Option 5: Heroku (Full-Stack)**

**Note:** Heroku no longer has a free tier, but includes it for reference.

1. **Install Heroku CLI:**

```powershell
npm install -g heroku
```

2. **Login:**

```powershell
heroku login
```

3. **Create Apps:**

```powershell
# Backend
cd backend
heroku create mgnrega-backend
git push heroku main

# Frontend
cd frontend
heroku create mgnrega-frontend
git push heroku main
```

**Pros:**

- ✅ Easy deployment
- ✅ Good documentation

**Cons:**

- ⚠️ No longer free (starts at $7/month)

---

## 🏆 **Recommended Deployment Strategy**

### **For Your Assignment (Best & Free):**

**Use Render.com for both Frontend + Backend**

**Why?**

- ✅ Completely FREE
- ✅ Single platform (easy to manage)
- ✅ Direct GitHub integration
- ✅ Supports Node.js backend as-is
- ✅ Automatic HTTPS
- ✅ Easy setup (15 minutes)

**Deployment Steps:**

1. Push code to GitHub
2. Sign up on Render.com
3. Deploy Backend (Node.js service)
4. Deploy Frontend (Static site)
5. Update API URL in frontend
6. Done! ✅

**Your URLs will be:**

- Frontend: `https://mgnrega-portal.onrender.com`
- Backend: `https://mgnrega-backend.onrender.com`

---

## 📝 **Quick Comparison Table**

| Platform                  | Backend       | Frontend | Cost  | Ease       | Speed        |
| ------------------------- | ------------- | -------- | ----- | ---------- | ------------ |
| **Render**                | ✅            | ✅       | FREE  | ⭐⭐⭐⭐⭐ | 🟡 Slow wake |
| **Vercel**                | 🟡 Serverless | ✅       | FREE  | ⭐⭐⭐⭐   | ⚡ Fast      |
| **Netlify + Railway**     | ✅            | ✅       | FREE  | ⭐⭐⭐     | ⚡ Fast      |
| **GitHub Pages + Render** | ✅            | ✅       | FREE  | ⭐⭐⭐     | ⚡ Fast      |
| **Heroku**                | ✅            | ✅       | $7/mo | ⭐⭐⭐⭐⭐ | ⚡ Fast      |

---

## 🔧 **Code Changes Needed for Deployment**

### **1. Update API URL in Frontend**

Create `frontend/.env`:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Update `frontend/src/pages/StructuredHomePage.tsx`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Replace all fetch calls:
fetch(`${API_URL}/api/states`);
fetch(`${API_URL}/api/stats`);
```

Do the same for `SimpleStatePage.tsx`.

### **2. Update Backend CORS**

In `backend/server.js`, update CORS to allow your frontend domain:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:3002",
      "http://localhost:3000",
      "https://your-frontend-url.onrender.com",
      "https://your-frontend-url.netlify.app",
    ],
  })
);
```

### **3. Add Environment Port**

Backend already has:

```javascript
const PORT = process.env.PORT || 3001;
```

✅ This is correct for deployment!

---

## 📱 **Testing After Deployment**

1. **Test Backend:**

```
https://your-backend.onrender.com/api/states
```

Should return JSON with 7 states.

2. **Test Frontend:**

```
https://your-frontend.onrender.com
```

Should show homepage with states.

3. **Check Browser Console:**
   - No CORS errors
   - API calls successful

---

## 🎯 **My Recommendation for You**

**Use Render.com - Here's Why:**

1. ✅ **100% Free** - No credit card needed
2. ✅ **Easy Setup** - Just connect GitHub
3. ✅ **No Code Changes** - Works with your current code
4. ✅ **Automatic Deployment** - Push to GitHub = Auto deploy
5. ✅ **HTTPS Included** - Secure by default

**Total Time:** 15-20 minutes to deploy! 🚀

---

## 📞 **Need Help?**

If you get stuck, check:

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

**Your assignment project will be live on the internet!** 🌐
