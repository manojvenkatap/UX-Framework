# 🚀 Netlify Deployment Guide for Claude API Proxy

## 📋 **Overview**

This guide will help you deploy the Claude API proxy server to Netlify, keeping your API key secure on the server-side.

## 🔧 **Prerequisites**

- ✅ **GitHub account** (free)
- ✅ **Netlify account** (free)
- ✅ **Claude API key** (from Anthropic)

## 🚀 **Step-by-Step Deployment**

### **Step 1: Create GitHub Repository**

1. **Go to GitHub.com** and create a new repository
2. **Name it**: `figma-claude-proxy` (or any name you prefer)
3. **Make it public** (required for free Netlify)
4. **Upload all files** from the `figma-plugin` folder:
   - `netlify/functions/claude-proxy.js`
   - `package.json`
   - `netlify.toml`

### **Step 2: Connect to Netlify**

1. **Go to Netlify.com** and sign up/login
2. **Click "New site from Git"**
3. **Connect GitHub** and select your repository
4. **Configure build settings**:
   - **Build command**: `echo 'No build required'`
   - **Publish directory**: `.` (root)
5. **Click "Deploy site"**

### **Step 3: Set Environment Variables**

1. **Go to Site settings** → **Environment variables**
2. **Add new variable**:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: `your_claude_api_key_here`
3. **Click "Save"**

### **Step 4: Get Your Netlify URL**

1. **Go to Site overview**
2. **Copy your site URL** (e.g., `https://amazing-name-123456.netlify.app`)
3. **Update the plugin code** with your URL

### **Step 5: Update Plugin Code**

Replace `https://your-app-name.netlify.app` in `code.js` with your actual Netlify URL:

```javascript
const response = await fetch('https://your-actual-site.netlify.app/.netlify/functions/claude-proxy', {
```

## 🔒 **Security Features**

### **✅ API Key Protection:**
- **Stored in Netlify** environment variables
- **Encrypted** by Netlify
- **Never exposed** to client/browser
- **Server-side only** access

### **✅ CORS Handling:**
- **Proper headers** for Figma plugin
- **Preflight request** support
- **Cross-origin** requests allowed

### **✅ Error Handling:**
- **Request validation**
- **API error handling**
- **Graceful fallbacks**

## 🧪 **Testing Your Deployment**

### **Test the Proxy Server:**

```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/claude-proxy \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello Claude!"}]}'
```

### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "text": "Hello! How can I help you today?"
      }
    ]
  }
}
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"ANTHROPIC_API_KEY not found"**
   - ✅ Check environment variables in Netlify
   - ✅ Make sure variable name is exactly `ANTHROPIC_API_KEY`

2. **CORS errors in Figma**
   - ✅ Check Netlify URL is correct in plugin code
   - ✅ Verify function is deployed correctly

3. **Function not found (404)**
   - ✅ Check function path: `/.netlify/functions/claude-proxy`
   - ✅ Verify `netlify/functions/claude-proxy.js` exists

## 📊 **Usage Limits**

### **Netlify Free Tier:**
- ✅ **125,000 requests/month** - More than enough!
- ✅ **100GB bandwidth** - Plenty for text responses
- ✅ **300 build minutes** - Sufficient for deployments

### **Typical Usage:**
- **UX Research Questions**: ~1-2 requests per session
- **Daily Usage**: ~10-20 requests
- **Monthly Usage**: ~300-600 requests

## 🎯 **Next Steps**

1. ✅ **Deploy to Netlify** (follow steps above)
2. ✅ **Update plugin** with your Netlify URL
3. ✅ **Test in Figma** plugin
4. ✅ **Enjoy AI-powered UX research!**

## 🆘 **Need Help?**

If you encounter any issues:
1. **Check Netlify logs** in Site settings
2. **Verify environment variables** are set
3. **Test the function** with curl command
4. **Check plugin console** for errors

---

**Your API key is completely secure on the server-side!** 🔒🚀
