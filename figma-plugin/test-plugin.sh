#!/bin/bash

# UX Research Helper - Figma Plugin Test Script
# This script validates the plugin setup and tests basic functionality

echo "🎨 UX Research Helper - Plugin Validation"
echo "========================================"

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: manifest.json not found. Please run this script from the figma-plugin directory."
    exit 1
fi

echo "✅ Found manifest.json"

# Validate manifest.json
echo "🔍 Validating manifest.json..."
if python3 -m json.tool manifest.json > /dev/null 2>&1; then
    echo "✅ manifest.json is valid JSON"
else
    echo "❌ manifest.json contains invalid JSON"
    exit 1
fi

# Check required files
echo "📁 Checking required files..."
required_files=("manifest.json" "code.js" "ui.html")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found $file"
    else
        echo "❌ Missing $file"
        exit 1
    fi
done

# Check instructions folder
echo "📁 Checking instructions folder..."
if [ -d "instructions" ]; then
    echo "✅ Found instructions folder"
    instruction_files=("Global - Global instructions.md" "UX Research - Problem Finder.md")
    for file in "${instruction_files[@]}"; do
        if [ -f "instructions/$file" ]; then
            echo "✅ Found instructions/$file"
        else
            echo "❌ Missing instructions/$file"
            exit 1
        fi
    done
else
    echo "❌ Missing instructions folder"
    exit 1
fi

# Check file sizes (basic validation)
echo "📊 Checking file sizes..."
for file in "${required_files[@]}"; do
    size=$(wc -c < "$file")
    if [ "$size" -gt 0 ]; then
        echo "✅ $file has content ($size bytes)"
    else
        echo "❌ $file is empty"
        exit 1
    fi
done

# Validate HTML structure
echo "🔍 Validating HTML structure..."
if grep -q "<!DOCTYPE html>" ui.html && grep -q "<script>" ui.html; then
    echo "✅ ui.html has proper HTML structure"
else
    echo "❌ ui.html missing required HTML elements"
    exit 1
fi

# Validate JavaScript structure
echo "🔍 Validating JavaScript structure..."
if grep -q "figma.ui.onmessage" code.js && grep -q "ResearchManager" code.js; then
    echo "✅ code.js has proper plugin structure"
else
    echo "❌ code.js missing required plugin elements"
    exit 1
fi

# Check for Cursor API key
echo "🔑 Checking Cursor API key..."
if grep -q "key_dbfaeaa56a1abd7604a074c8c0a9ba8f337794e0026c9382b0e4ffe8b5071abe" code.js; then
    echo "✅ Cursor API key found in code.js"
else
    echo "❌ Cursor API key not found in code.js"
    exit 1
fi

# Check network permissions
echo "🌐 Checking network permissions..."
if grep -q "netlify.app" manifest.json && grep -q "raw.githubusercontent.com" manifest.json; then
    echo "✅ Network permissions configured correctly"
else
    echo "❌ Network permissions missing or incorrect"
    exit 1
fi

# Test API connectivity (optional)
echo "🔗 Testing API connectivity..."
echo "⚠️  Netlify proxy connectivity test skipped (requires deployed URL)"

if curl -s --connect-timeout 5 https://raw.githubusercontent.com > /dev/null 2>&1; then
    echo "✅ GitHub is accessible"
else
    echo "⚠️  GitHub connectivity test failed (this may be normal)"
fi

echo ""
echo "🎉 Plugin validation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Open Figma Desktop App or FigJam Desktop App"
echo "2. Go to Plugins → Development → Import plugin from manifest..."
echo "3. Select the manifest.json file from this directory"
echo "4. Run the plugin from Plugins → Development → UX Research Helper"
echo ""
echo "🔧 If you encounter issues:"
echo "- Ensure you're using Figma Desktop App or FigJam Desktop App (not web version)"
echo "- Check that all files are in the same directory"
echo "- Verify your internet connection"
echo "- Check the browser console for error messages"
echo ""
echo "📚 For more help, see README.md"
