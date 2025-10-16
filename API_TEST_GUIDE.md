# 🧪 API Testing Guide

## Your Deployed Backend URL
`https://mgnrega-backend.onrender.com`

---

## ⏳ **IMPORTANT: Wait for Deployment**
After pushing code, Render takes **2-3 minutes** to redeploy. 

Check deployment status:
1. Go to https://render.com/dashboard
2. Click on `mgnrega-backend`
3. Wait for "Live" status (green dot)

---

## 🧪 **Test Your API Endpoints**

Once deployed, test these URLs in your browser:

### 1. **Root Endpoint** (API Info)
```
https://mgnrega-backend.onrender.com/
```
**Expected:** JSON with API documentation

---

### 2. **All States** 
```
https://mgnrega-backend.onrender.com/api/states
```
**Expected:** JSON array with 7 states (RAJ, UP, BIH, MP, OD, JH, WB)

---

### 3. **National Statistics**
```
https://mgnrega-backend.onrender.com/api/stats
```
**Expected:** JSON with:
- total_job_cards
- total_active_workers
- total_work_completion_rate
- average_wage_rate

---

### 4. **State Details** (Example: Rajasthan)
```
https://mgnrega-backend.onrender.com/api/states/RAJ
```
**Expected:** JSON with state info + 5 districts

---

### 5. **Health Check**
```
https://mgnrega-backend.onrender.com/health
```
**Expected:** JSON with server health status

---

## ⚠️ **Common Issues**

### Issue: "Cannot GET /"
**Reason:** Old deployment without root route
**Solution:** Wait for new deployment to finish (2-3 minutes)

### Issue: Takes 30-60 seconds to load
**Reason:** Free tier "cold start" - server was sleeping
**Solution:** Normal for free tier, wait patiently

### Issue: Still showing error after waiting
**Solution:** 
1. Check Render dashboard logs
2. Verify environment variables are set
3. Make sure `PORT` is set to `10000`

---

## 📊 **What Good Responses Look Like**

### Root Endpoint (`/`)
```json
{
  "message": "MGNREGA Portal API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "states": "/api/states",
    "stateDetails": "/api/states/:stateCode",
    "districts": "/api/states/:stateCode/districts",
    "nationalStats": "/api/stats",
    "health": "/health"
  },
  "example": "Try: /api/states or /api/stats"
}
```

### States Endpoint (`/api/states`)
```json
{
  "success": true,
  "data": [
    {
      "code": "RAJ",
      "name": "Rajasthan",
      "hindi_name": "राजस्थान",
      "district_count": 33,
      "total_workers": 2500000
    },
    ...
  ],
  "source": "fallback",
  "timestamp": "2025-10-17T..."
}
```

---

## ✅ **Quick Test Checklist**

- [ ] Wait 2-3 minutes for Render deployment
- [ ] Visit root URL - should show API info (not "Cannot GET /")
- [ ] Test `/api/states` - should show 7 states
- [ ] Test `/api/stats` - should show national statistics
- [ ] Test `/api/states/RAJ` - should show Rajasthan + 5 districts
- [ ] All responses should be valid JSON
- [ ] Status should be 200 OK

---

## 🚀 **Next Step After Backend Works**

Once all these endpoints work, you can deploy your frontend!

The frontend will use environment variable:
```
VITE_API_URL=https://mgnrega-backend.onrender.com
```

---

## 💡 **Pro Tip**

First request after sleep takes 30-60 seconds (cold start).
This is normal for free tier. Don't panic! ☕
