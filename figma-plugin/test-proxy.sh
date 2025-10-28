#!/bin/bash

# Test script for UX Research Helper Plugin
echo "Testing UX Research Helper Plugin..."

# Test the Netlify proxy
echo "Testing Netlify proxy..."
curl -X POST https://claude-proxy.netlify.app/.netlify/functions/claude-proxy \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Generate a UX research question for User Dimension phase. Format as JSON with question, options, and reasoning fields."}]}' \
  --max-time 10

echo ""
echo "Test completed. Check the response above."
echo ""
echo "To deploy the plugin:"
echo "1. Set CURSOR_API_KEY environment variable in Netlify"
echo "2. Deploy the netlify folder to Netlify"
echo "3. Load the plugin in Figma using the manifest.json"
