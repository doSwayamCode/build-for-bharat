# 🔧 Frontend Deployment Issue - QUICK FIX

## ❌ Problem
Your frontend shows "State not found / राज्य नहीं मिला" because it can't connect to the backend API.

## ✅ Solution: Add Environment Variable to Frontend

### **Step 1: Go to Render Dashboard**
1. Visit: https://render.com/dashboard
2. Click on your **frontend service** (`mgnrega-frontend`)

### **Step 2: Add Environment Variable**
1. Click **"Environment"** tab in the left sidebar
2. Click **"Add Environment Variable"** button
3. Add this:
   ```
   Key: VITE_API_URL
   Value: https://mgnrega-backend.onrender.com
   ```
4. Click **"Save Changes"**

### **Step 3: Wait for Redeploy**
- Frontend will automatically redeploy (takes 3-5 minutes)
- Watch the "Logs" tab to see progress
- Wait for "Live" status (green dot)

### **Step 4: Test Again**
Visit: `https://mgnrega-frontend.onrender.com`
- Homepage should load with 7 states
- Click any state → Should show districts
- No more "State not found" error!

---

## 🧪 **How to Verify Backend is Working**

Before testing frontend, verify backend works:

### Test 1: Root endpoint
```
https://mgnrega-backend.onrender.com/
```
✅ Should show: API documentation JSON

### Test 2: States endpoint
```
https://mgnrega-backend.onrender.com/api/states
```
✅ Should show: 7 states array

### Test 3: Bihar state details
```
https://mgnrega-backend.onrender.com/api/states/BIH
```
✅ Should show: Bihar info + 5 districts

---

## 📊 **Why This Happens**

### **Problem Chain:**
1. Frontend deployed WITHOUT `VITE_API_URL` environment variable
2. Frontend tries to use default: `http://localhost:3001`
3. Localhost doesn't exist on Render servers
4. API calls fail
5. `stateData` stays `null`
6. Page shows "State not found"

### **Solution Chain:**
1. Add `VITE_API_URL=https://mgnrega-backend.onrender.com`
2. Frontend rebuilds with correct API URL
3. API calls go to your deployed backend
4. Data loads successfully
5. Pages work! ✅

---

## 🎯 **Complete Checklist**

### Backend (should already be done):
- [x] Backend deployed on Render
- [x] Root route added (`/`)
- [x] `/api/states` endpoint works
- [x] `/api/states/BIH` endpoint works

### Frontend (do this now):
- [ ] Go to Render → Frontend service
- [ ] Click "Environment" tab
- [ ] Add `VITE_API_URL` = `https://mgnrega-backend.onrender.com`
- [ ] Save changes
- [ ] Wait 3-5 minutes for redeploy
- [ ] Test homepage
- [ ] Click state cards → should work now!

---

## 🔍 **Debug Tips**

### Check Browser Console:
1. Open your frontend: `https://mgnrega-frontend.onrender.com`
2. Press `F12` → Go to "Console" tab
3. Look for errors

**Common Error (Before Fix):**
```
Failed to fetch http://localhost:3001/api/states/BIH
```
This means: Frontend using localhost (wrong!)

**After Fix:**
```
Fetching from: https://mgnrega-backend.onrender.com/api/states/BIH
```
This means: Frontend using deployed backend (correct!)

---

## 📝 **Environment Variable Reference**

| Service  | Variable Name    | Value                                      |
| -------- | ---------------- | ------------------------------------------ |
| Backend  | `PORT`           | `10000` (already set)                      |
| Backend  | `FRONTEND_URL`   | `https://mgnrega-frontend.onrender.com`    |
| Frontend | `VITE_API_URL`   | `https://mgnrega-backend.onrender.com`     |

---

## ⚡ **After Fix - Expected Behavior**

1. **Homepage (`/`):**
   - Shows national statistics
   - Shows 7 state cards
   - Green "API Connected" badge

2. **State Page (`/state/BIH`):**
   - Shows Bihar header
   - Shows state statistics (4 cards)
   - Shows 5 districts with details

3. **About Page (`/about`):**
   - Shows MGNREGA information
   - Works without API

---

## 🚀 **Quick Action Steps**

```
1. Render Dashboard → mgnrega-frontend
2. Environment tab
3. Add Environment Variable
   Key: VITE_API_URL
   Value: https://mgnrega-backend.onrender.com
4. Save Changes
5. Wait 3-5 minutes
6. Refresh your site
7. Success! 🎉
```

---

## ❓ **Still Not Working?**

### Check these:

1. **Backend working?**
   - Test: `https://mgnrega-backend.onrender.com/api/states`
   - Should return JSON with states

2. **Environment variable added correctly?**
   - Go to Frontend → Environment
   - Verify `VITE_API_URL` exists
   - Value should be: `https://mgnrega-backend.onrender.com`
   - NO trailing slash!

3. **Frontend redeployed?**
   - Go to Frontend → Logs
   - Should see new build after adding env var
   - Wait for "Live" status

4. **CORS error?**
   - Add `FRONTEND_URL` to backend
   - Value: `https://mgnrega-frontend.onrender.com`

---

## 💡 **Pro Tips**

- Environment variables require rebuild to take effect
- Vite env vars MUST start with `VITE_`
- No trailing slashes in URLs
- Check browser console for detailed errors
- First load after deploy may take 60 seconds (cold start)

---

**Your site will work perfectly after adding the environment variable!** 🎊
