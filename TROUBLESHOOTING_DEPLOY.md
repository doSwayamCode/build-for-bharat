# 🔍 TROUBLESHOOTING - State Not Found Issue

## 📊 Current Status

Your deployment is live but showing "State not found". Let's diagnose the issue step by step.

---

## ✅ **Step 1: Wait for Frontend Redeploy**

After pushing the debug code, Render needs to redeploy your frontend.

**Action:**

1. Go to https://render.com/dashboard
2. Click `mgnrega-frontend`
3. Check "Events" or "Logs" tab
4. Wait for new deployment (should show commit: "Add debug logging to frontend pages")
5. **Wait 3-5 minutes** for build to complete

---

## 🧪 **Step 2: Test Backend Directly**

Before testing frontend, verify backend works:

### Test 1: Root endpoint

Open in browser:

```
https://mgnrega-backend.onrender.com/
```

✅ Expected: JSON with API info

### Test 2: All states

```
https://mgnrega-backend.onrender.com/api/states
```

✅ Expected: JSON array with 7 states

### Test 3: Bihar state

```
https://mgnrega-backend.onrender.com/api/states/BIH
```

✅ Expected: JSON with Bihar + 5 districts

**If any test fails:** Backend needs to restart or has an error. Check backend logs.

---

## 🔍 **Step 3: Check Browser Console**

After frontend redeploys, visit your site and check console:

### How to Check:

1. Visit: `https://mgnrega-frontend.onrender.com`
2. Press **F12** (or Right-click → Inspect)
3. Click **"Console"** tab
4. Look for these messages:

### ✅ Good Console Output:

```
Homepage - API_URL: https://mgnrega-backend.onrender.com
States response status: 200
Stats response status: 200
States data: {success: true, data: Array(7)}
Stats data: {success: true, data: {...}}
```

### ❌ Bad Console Output (API not configured):

```
Homepage - API_URL: http://localhost:3001
Failed to fetch...
```

**Solution:** VITE_API_URL not set correctly in Render

### ❌ Bad Console Output (CORS error):

```
Access to fetch blocked by CORS policy
```

**Solution:** Backend CORS configuration needs frontend URL

---

## 🔧 **Step 4: Verify Environment Variables**

### Backend Environment Variables:

Go to Render → `mgnrega-backend` → Environment

Should have:

```
PORT = 10000
FRONTEND_URL = https://mgnrega-frontend.onrender.com
```

### Frontend Environment Variables:

Go to Render → `mgnrega-frontend` → Environment

Should have:

```
VITE_API_URL = https://mgnrega-backend.onrender.com
```

**Important:** NO trailing slash in VITE_API_URL!

---

## 📱 **Step 5: Check State Page with Debug Info**

After redeploy, click any state (e.g., Bihar):

URL: `https://mgnrega-frontend.onrender.com/state/BIH`

### The page will now show:

- Error message (if any)
- API URL being used
- State code

### ✅ If you see:

```
API URL: https://mgnrega-backend.onrender.com
State Code: BIH
```

Good! Using correct URL.

### ❌ If you see:

```
API URL: http://localhost:3001
State Code: BIH
```

Bad! Environment variable not applied. Redeploy frontend.

---

## 🛠️ **Common Issues & Solutions**

### Issue 1: "API URL: http://localhost:3001"

**Problem:** VITE_API_URL environment variable not set or frontend not rebuilt
**Solution:**

1. Render → Frontend → Environment
2. Verify `VITE_API_URL` exists
3. If missing: Add it and save
4. If exists: Click "Manual Deploy" → "Clear build cache & deploy"

### Issue 2: CORS Error in Console

**Problem:** Backend not allowing frontend origin
**Solution:**

1. Render → Backend → Environment
2. Add: `FRONTEND_URL = https://mgnrega-frontend.onrender.com`
3. Save (backend will auto-redeploy)

### Issue 3: Backend Takes Forever

**Problem:** Cold start (free tier sleeps after 15 min)
**Solution:** Wait 30-60 seconds, then refresh

### Issue 4: 404 on API Calls

**Problem:** Backend routes not working
**Solution:** Check backend logs for errors

---

## 🎯 **Quick Diagnostic Commands**

### Test Backend from Command Line:

```powershell
# Test backend root
curl https://mgnrega-backend.onrender.com/

# Test states API
curl https://mgnrega-backend.onrender.com/api/states

# Test specific state
curl https://mgnrega-backend.onrender.com/api/states/BIH
```

All should return JSON (not HTML or errors).

---

## 📋 **Complete Checklist**

### Backend:

- [ ] Backend service is "Live" (green status)
- [ ] `PORT = 10000` environment variable set
- [ ] `FRONTEND_URL = https://mgnrega-frontend.onrender.com` set
- [ ] Test URL works: `https://mgnrega-backend.onrender.com/api/states`
- [ ] Returns JSON (not HTML)

### Frontend:

- [ ] Frontend service is "Live" (green status)
- [ ] `VITE_API_URL = https://mgnrega-backend.onrender.com` set (NO trailing slash)
- [ ] Redeployed after setting environment variable
- [ ] Latest commit is "Add debug logging to frontend pages"

### Testing:

- [ ] Homepage loads (may show fallback data)
- [ ] Browser console shows correct API_URL
- [ ] Click state → Check debug info shown on error page
- [ ] Backend responds within 60 seconds (cold start)

---

## 🚨 **If Still Not Working**

### Do This:

1. **Clear Build Cache:**

   - Render → Frontend → "Manual Deploy" → "Clear build cache & deploy"

2. **Restart Backend:**

   - Render → Backend → "Manual Deploy" → "Deploy latest commit"

3. **Check Logs:**

   - Render → Backend → "Logs" (look for errors)
   - Render → Frontend → "Logs" (look for build errors)

4. **Take Screenshot:**
   - Browser console (F12 → Console tab)
   - Error page with debug info
   - Share with me for diagnosis

---

## 💡 **Expected Timeline**

After correct configuration:

- **Backend redeploy:** 2-3 minutes
- **Frontend redeploy:** 3-5 minutes
- **First load (cold start):** 30-60 seconds
- **Subsequent loads:** 2-5 seconds

---

## ✅ **Success Indicators**

You'll know it's working when:

1. ✅ Homepage shows "🟢 API Connected" badge
2. ✅ Click Bihar → Shows state header + districts
3. ✅ Console shows: `API_URL: https://mgnrega-backend.onrender.com`
4. ✅ No errors in console
5. ✅ All 7 states clickable and working

---

## 📞 **Next Steps**

1. **Wait 3-5 minutes** for frontend to redeploy with debug logging
2. **Visit your site** and check browser console (F12)
3. **Click a state** and look at debug info on error page
4. **Share screenshot** of console or error page if still broken

The debug info will tell us exactly what's wrong! 🔍
