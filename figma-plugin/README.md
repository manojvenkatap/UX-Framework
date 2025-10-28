# 🎨 UX Research Helper - Figma Plugin (V1)

A professional Figma plugin that integrates your UX Research Framework with Cursor AI for systematic design research directly within Figma.

## ✨ Features

### 🏠 **Landing Screen**
- **Header**: UX logo (left) + V1 version badge (right)
- **Welcome Message**: Professional introduction to the plugin
- **Tool Selection**: Clean list of available research tools
- **Navigation**: Smooth transitions between screens

### 🔬 **UX Research Tool**
- **Tool Description**: Clear explanation of research capabilities
- **Method Selection**: Problem Finder and future methods
- **Research Flow**: One question at a time, systematic approach
- **AI Integration**: Cursor AI processes each answer for insights

### 📊 **Fixed Footer Status**
- **Gaps**: Research gaps identified (clickable for details)
- **Follow-ups**: Additional questions generated (clickable for details)  
- **Design Discussion**: Design implications (clickable for details)
- **Save for Later**: Save current progress

### 🔍 **Status Modals**
- **Clickable Cards**: Each status item opens detailed modal
- **Modal Content**: Shows specific artifacts for that status type
- **Close Action**: Returns to research flow seamlessly
- **Navigation**: Continue research from where left off

## 🏗️ Architecture

### 📁 File Structure
```
figma-plugin/
├── manifest.json                    # Plugin configuration
├── code.js                         # Main plugin logic (Figma sandbox)
├── ui.html                         # Plugin interface (web context)
├── instructions/                   # External instruction files
│   ├── Global - Global instructions.md
│   └── UX Research - Problem Finder.md
├── README.md                       # Complete documentation
├── QUICK-START.md                  # Simple setup guide
└── test-plugin.sh                  # Validation script
```

### 🔄 Navigation Flow
1. **Landing Screen** → Tool selection
2. **UX Research Screen** → Method selection  
3. **Research Flow** → Question-by-question research
4. **Status Modals** → Detailed artifact viewing
5. **Save/Export** → Progress management

### 📋 External Instructions
- **No Hardcoded Data**: All content loaded from external files
- **Easy Maintenance**: Update instructions without code changes
- **Modular Structure**: Separate files for different concerns
- **Version Control**: Track instruction changes independently

## 🚀 Installation

### Quick Setup
```bash
# Navigate to plugin directory
cd "/Users/dq_manojp/Documents/Repositories/UI UX/UX-Framework/figma-plugin"

# Test the plugin
./test-plugin.sh

# Install in Figma Desktop App:
# Plugins → Development → Import plugin from manifest...
# Select: manifest.json
```

### Installation Steps
1. **Open Figma Desktop App or FigJam Desktop App** (not web version)
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Select: `manifest.json` from the plugin directory
4. Click "Open"
5. Run: `Plugins` → `Development` → `UX Research Helper`

## 🎯 Usage

### Starting Research
1. **Landing Screen**: Click "UX Research" tool
2. **Tool Selection**: Click "Problem Finder" method
3. **Research Flow**: Answer questions one at a time
4. **AI Processing**: Each answer analyzed by Cursor AI
5. **Status Tracking**: Monitor progress in footer

### Research Workflow
- **User Dimension**: Understanding who experiences the problem
- **Problem Dimension**: Defining what's wrong and why  
- **Context Dimension**: Understanding environment and constraints
- **AI Analysis**: Intelligent insights and recommendations
- **Status Management**: Track gaps, follow-ups, design discussions

### Status Management
- **Click Status Cards**: View detailed artifacts in modals
- **Save Progress**: Save research to Figma's local storage
- **Export Research**: Download complete research as JSON
- **Continue Later**: Resume research from saved state

## 🔧 Configuration

### Pre-configured Settings
- ✅ **Cursor API Key**: Your key embedded in plugin
- ✅ **External Instructions**: Loaded from `/instructions/` folder
- ✅ **Network Access**: Configured for required domains
- ✅ **Professional UI**: Modern, responsive interface

### Instruction Files
- **Global Instructions**: Plugin-wide rules and navigation
- **Problem Finder Instructions**: Specific research methodology
- **Easy Updates**: Modify instructions without code changes
- **Version Control**: Track instruction changes separately

## 🔒 Security & Privacy

### Data Management
- **Local Storage**: Research data stored in Figma
- **No External Sharing**: Data only sent to Cursor AI for processing
- **Export Control**: User controls data export and sharing
- **API Security**: Cursor API key embedded (consider environment variables for production)

### Network Access
- **Required Domains**: 
  - `https://api.cursor.sh` - Cursor AI API
  - `https://raw.githubusercontent.com` - Framework loading
  - `https://cdn.tailwindcss.com` - UI styling

## 🐛 Troubleshooting

### Common Issues
1. **Plugin Won't Load**: Use Figma Desktop App, not web version
2. **Instructions Not Loading**: Check `instructions/` folder exists
3. **API Errors**: Verify internet connection and API key validity
4. **Navigation Issues**: Check browser console for errors

### Debug Mode
- **Right-click in plugin UI** → "Inspect Element"
- **Check Console tab** for error messages
- **Run validation script**: `./test-plugin.sh`

## 📈 What's New in V1

### ✨ New Features
- **Professional Landing Screen**: Logo + version + welcome message
- **Structured Navigation**: Clear flow between screens
- **Fixed Footer Status**: Always visible progress indicators
- **Status Modals**: Detailed artifact viewing
- **External Instructions**: No hardcoded data
- **Dynamic Loading**: All content loaded from files

### 🔄 Improvements
- **Better UX**: Smooth transitions and clear navigation
- **Maintainable Code**: External instruction files
- **Professional Design**: Modern, clean interface
- **Status Awareness**: Always know research progress
- **Modal System**: Detailed artifact viewing

## 🚀 Future Enhancements

### Planned Features
- **Multiple Research Methods**: Additional frameworks
- **Team Collaboration**: Shared research sessions
- **Design Integration**: Apply insights to Figma designs
- **Analytics Dashboard**: Research progress visualization
- **Template Library**: Pre-built research templates

### Integration Opportunities
- **Design Systems**: Connect with design system docs
- **User Testing**: Integration with testing platforms
- **Project Management**: Connect with Jira, Asana
- **Documentation**: Auto-generate research reports

## 📞 Support

### Getting Help
1. **Check Documentation**: Review README and instruction files
2. **Run Validation**: Use `./test-plugin.sh` for diagnostics
3. **Debug Issues**: Use browser developer tools
4. **Report Bugs**: Create issues in GitHub repository

### Resources
- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [UX Research Framework](https://github.com/manojvenkatap/UX-Framework)
- [Cursor AI Documentation](https://cursor.sh/docs)

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Compatibility**: Figma Desktop App 116.0+ | FigJam Desktop App 116.0+  
**Status**: Production Ready ✅