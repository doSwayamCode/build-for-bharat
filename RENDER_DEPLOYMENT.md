# 🚀 Deploy MGNREGA Portal on Render (FREE)

## Step-by-Step Deployment Guide

### **Prerequisites**

- GitHub account
- Render account (free): https://render.com

---

## 📋 **Step 1: Prepare Your Project**

### 1.1 Initialize Git Repository

```powershell
# Navigate to project root
cd c:\Users\Swayam\Desktop\BfB\mgnrega-portal

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MGNREGA Portal"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `mgnrega-portal`
4. Make it **Public** (required for Render free tier)
5. Don't initialize with README (you already have one)
6. Click "Create Repository"

### 1.3 Push to GitHub

```powershell
# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mgnrega-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🔧 **Step 2: Prepare Backend for Deployment**

### 2.1 Update Backend server.js

Open `backend/server.js` and update the CORS to allow your frontend URL:

Find this line (around line 22):

```javascript
app.use(cors());
```

Replace with:

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
```

And update the PORT line (around line 13):

```javascript
const PORT = process.env.PORT || 3001;
```

### 2.2 Add Start Script to Backend package.json

Open `backend/package.json` and make sure it has:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## 🎨 **Step 3: Prepare Frontend for Deployment**

### 3.1 Update API URL in Frontend

Create a new file `frontend/src/config.ts`:

```typescript
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
```

### 3.2 Update All API Calls

In all three page files, replace `http://localhost:3001` with the config:

**StructuredHomePage.tsx:**

```typescript
import { API_URL } from "../config";

// Change from:
fetch("http://localhost:3001/api/states");

// To:
fetch(`${API_URL}/api/states`);
```

**SimpleStatePage.tsx:**

```typescript
import { API_URL } from "../config";

// Change from:
fetch(`http://localhost:3001/api/states/${stateCode}`);

// To:
fetch(`${API_URL}/api/states/${stateCode}`);
```

### 3.3 Add Build Script to Frontend package.json

Open `frontend/package.json` and verify it has:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 3.4 Commit Changes

```powershell
git add .
git commit -m "Prepare for Render deployment"
git push
```

---

## 🌐 **Step 4: Deploy Backend on Render**

### 4.1 Create Backend Service

1. Go to https://render.com
2. Sign up / Log in
3. Click **"New +"** button
4. Select **"Web Service"**

### 4.2 Connect GitHub Repository

1. Click **"Connect Account"** for GitHub
2. Authorize Render to access your repositories
3. Find and select your `mgnrega-portal` repository
4. Click **"Connect"**

### 4.3 Configure Backend Service

Fill in the following:

| Field              | Value                         |
| ------------------ | ----------------------------- |
| **Name**           | `mgnrega-backend`             |
| **Region**         | Singapore (or closest to you) |
| **Branch**         | `main`                        |
| **Root Directory** | `backend`                     |
| **Runtime**        | `Node`                        |
| **Build Command**  | `npm install`                 |
| **Start Command**  | `npm start`                   |
| **Instance Type**  | `Free`                        |

### 4.4 Add Environment Variables

Scroll down to **"Environment Variables"** section:

- Click **"Add Environment Variable"**
- Add:
  ```
  Key: PORT
  Value: 10000
  ```

### 4.5 Deploy Backend

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. You'll get a URL like: `https://mgnrega-backend.onrender.com`
4. **Save this URL!** You'll need it for frontend

### 4.6 Test Backend

Visit: `https://mgnrega-backend.onrender.com/api/states`

You should see JSON data with all 7 states! ✅

---

## 🎨 **Step 5: Deploy Frontend on Render**

### 5.1 Create Frontend Service

1. Go back to Render Dashboard
2. Click **"New +"** button
3. Select **"Static Site"**

### 5.2 Connect Same Repository

1. Select your `mgnrega-portal` repository
2. Click **"Connect"**

### 5.3 Configure Frontend Service

Fill in:

| Field                 | Value                          |
| --------------------- | ------------------------------ |
| **Name**              | `mgnrega-frontend`             |
| **Branch**            | `main`                         |
| **Root Directory**    | `frontend`                     |
| **Build Command**     | `npm install && npm run build` |
| **Publish Directory** | `dist`                         |

### 5.4 Add Environment Variables

In **"Environment Variables"** section:

- Click **"Add Environment Variable"**
- Add:
  ```
  Key: VITE_API_URL
  Value: https://mgnrega-backend.onrender.com
  ```
  (Use YOUR actual backend URL from Step 4.5)

### 5.5 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for deployment
3. You'll get a URL like: `https://mgnrega-frontend.onrender.com`

---

## 🎉 **Step 6: Final Configuration**

### 6.1 Update Backend CORS

1. Go to your backend service on Render
2. Click **"Environment"** tab
3. Add new environment variable:

   ```
   Key: FRONTEND_URL
   Value: https://mgnrega-frontend.onrender.com
   ```

   (Use YOUR actual frontend URL)

4. Click **"Save Changes"**
5. Service will automatically redeploy

### 6.2 Test Your Live Website!

Visit your frontend URL: `https://mgnrega-frontend.onrender.com`

You should see:

- ✅ Homepage with 7 states
- ✅ National statistics
- ✅ Click states to see districts
- ✅ About page working

---

## 📝 **Important Notes**

### **Free Tier Limitations:**

- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds (cold start)
- ✅ 750 hours/month free (enough for 1 service 24/7)
- ✅ Unlimited static sites

### **Custom Domain (Optional):**

1. Go to your service settings
2. Click **"Custom Domain"**
3. Add your domain
4. Follow DNS instructions

---

## 🔧 **Troubleshooting**

### **Problem: Backend not responding**

**Solution:** Wait 30-60 seconds for cold start, then refresh

### **Problem: CORS errors**

**Solution:**

1. Check backend CORS configuration
2. Verify FRONTEND_URL environment variable
3. Restart backend service

### **Problem: Frontend shows "API connection failed"**

**Solution:**

1. Verify backend is deployed and running
2. Check VITE_API_URL in frontend environment variables
3. Test backend directly: `your-backend-url.onrender.com/api/states`

### **Problem: Changes not reflecting**

**Solution:**

1. Push changes to GitHub
2. Render auto-deploys on git push
3. Check deployment logs in Render dashboard

---

## 🎯 **Your Live URLs**

After deployment, you'll have:

| Service         | URL                                             |
| --------------- | ----------------------------------------------- |
| **Frontend**    | https://mgnrega-frontend.onrender.com           |
| **Backend API** | https://mgnrega-backend.onrender.com            |
| **API States**  | https://mgnrega-backend.onrender.com/api/states |
| **API Stats**   | https://mgnrega-backend.onrender.com/api/stats  |

---

## 📊 **Deployment Checklist**

- [ ] Git repository initialized
- [ ] Pushed to GitHub (public repo)
- [ ] Backend server.js updated (CORS, PORT)
- [ ] Frontend config.ts created
- [ ] Frontend API calls updated to use config
- [ ] Backend deployed on Render
- [ ] Backend URL saved
- [ ] Frontend deployed on Render
- [ ] Environment variables set (both services)
- [ ] Backend CORS updated with frontend URL
- [ ] Website tested and working
- [ ] Share your live URL! 🎉

---

## 🚀 **Next Steps After Deployment**

1. **Monitor:** Check Render dashboard for logs
2. **Update:** Push to GitHub, Render auto-deploys
3. **Share:** Share your live URL for assignment submission
4. **Upgrade (Optional):** $7/month for always-on backend

---

**Need Help?**

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com

**Your MGNREGA Portal is now LIVE on the internet! 🎊**
