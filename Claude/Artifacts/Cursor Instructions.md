# Cursor-Specific Instructions for HTML Template Creation

**Purpose:** This file contains Cursor-specific instructions for creating standalone HTML research reports.

**Usage:** When Claude needs to create a Live Research Document, it should reference this file for HTML template creation instructions.

---

## 🎯 HTML Template Creation Workflow

### Step 1: Request File Path

**Before creating any HTML document, Claude MUST ask:**

> 📁 **Where should I create the Live Research Document?**
>
> Please provide the file path where you want the HTML report saved.
>
> **Examples:**
> - `./research-reports/service-request-modal-research.html`
> - `./outputs/customer-portal-discovery.html`
> - `./UX Research - Service Request Modal.html`
>
> **File path:**

### Step 2: Parse Framework and Generate Dynamic HTML

**After receiving the path, follow this process:**

#### Framework Parsing Process:
1. **Read Framework File** - Parse the selected research framework .md file
2. **Extract Tab Structure** - Look for "Document Structure" section with tab definitions
3. **Generate Dynamic HTML** - Create HTML with framework-specific tabs
4. **Create JavaScript** - Generate tab switching code for framework tabs

#### Required Elements:
- **Tailwind CSS CDN** (no local dependencies)
- **Open source icons** (Heroicons or similar)
- **Dynamic tab generation** based on framework
- **Condensed view** (mobile-friendly, print-friendly)
- **Self-contained** (works offline after initial load)

#### Dynamic Template Structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Research Method] - [Feature Name]</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://unpkg.com/heroicons@2.0.18/24/outline/index.js"></script>
    <style>
        /* Design Helper styling */
        body { 
            font-size: 13px; 
            line-height: 1.5; 
            background: #f9fafb;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .completed-section { background: #dcfce7; }
        .current-section { background: #dbeafe; }
        .pending-section { background: #f3f4f6; }
        .insight-highlight { background: #fef3c7; }
        .action-accent { background: #fef2f2; }
        .additional-question { background: #f0f9ff; }
    </style>
</head>
<body class="print-friendly" style="background: #f9fafb;">
    <!-- Header with research progress -->
    
    <!-- DYNAMIC TABS (Generated from Framework) -->
    <div class="tab-container">
        <!-- Tabs generated based on framework "Document Structure" -->
        <button class="tab-btn active" onclick="openTab(event, 'dashboard')">Dashboard</button>
        <!-- Framework-specific tabs generated here -->
    </div>
    
    <!-- DYNAMIC TAB CONTENT (Generated from Framework) -->
    <div class="tab-content-container">
        <!-- Tab content generated based on framework tabs -->
    </div>
    
    <!-- Footer with metadata -->
</body>
</html>
```

#### Framework Tab Generation Logic:
1. **Parse Framework File** - Read framework .md file
2. **Extract Tab Structure** - Find "Document Structure" section
3. **Generate Tab Buttons** - Create tab buttons for each framework tab
4. **Generate Tab Content** - Create content sections for each tab
5. **Generate Progress Section** - Create progress items based on framework tabs (exclude Dashboard, Action Items)
6. **Create JavaScript** - Generate tab switching functions

#### Dynamic Progress Section Generation:
```javascript
// Generate progress items based on framework tabs
function generateProgressSection(frameworkTabs) {
    const progressTabs = frameworkTabs.filter(tab => 
        tab.name !== 'Dashboard' && tab.name !== 'Action Items'
    );
    
    progressTabs.forEach(tab => {
        const progressItem = document.createElement('div');
        progressItem.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="text-gray-400">${tab.name}</span>
                <span class="badge badge-pending">Upcoming</span>
            </div>
        `;
        document.querySelector('.progress-container').appendChild(progressItem);
    });
}
```

---

## 📋 Template Requirements

### Styling Standards (from Design Helper.md):
- **Font size:** 13px (as specified in Design Helper)
- **Line height:** 1.5
- **Background:** #f9fafb (as specified in Design Helper)
- **Font family:** System UI stack
- **Color Coding:**
  - **Completed sections:** Green background
  - **Current section:** Blue background  
  - **Pending sections:** Gray background
  - **Insights:** Yellow highlight
  - **Action items:** Red accent
  - **⊕ Additional questions:** Orange badge
- **Responsive Design:** Mobile-friendly tabs, collapsible sections, readable on all screens, print-friendly layout

### Dynamic Tab Generation (from Design Helper.md):

**Tab Structure Logic:**
1. **Always Include:**
   - Dashboard Tab (default)
   - Research Artifacts Tracking
   - Action Items Tab

2. **Framework-Specific Tabs:**
   - **Problem Finder:** User Dimension, Problem Dimension, Context Dimension, Findings & Insights
   - **Other Research Methods:** Will define their own tab structure in their .md files

3. **Phase Structure (if applicable):**
   - Some frameworks use phases (Setup, Phase 1-5)
   - Others use dimensions (User, Problem, Context)
   - Generate tabs based on framework specifications

**Dynamic Tab Generation Process:**
1. **Read framework .md file** for tab structure
2. **Generate tabs dynamically** based on framework requirements
3. **Create JavaScript** for tab switching
4. **Update HTML** with framework-specific tabs

### Interactive Elements (from Design Helper.md):
- **Tab Navigation:** Fully functional JavaScript tab switching
- **Collapsible Sections:** Expandable/collapsible question cards and sections  
- **Status Badges:** Dynamic badges that update based on research progress
- **Progress Bars:** Visual progress indicators for phases and token usage
- **Artifact Counters:** Live counters for Follow-up Questions, Gaps, Design Feedback, Assumptions
- **Action Item Lists:** Expandable action items with priority indicators
- **Question Cards:** Collapsible Q&A cards with status badges
- **Print-friendly** (clean layout for printing)

### JavaScript Requirements (from Design Helper.md):
- **`openTab()` function** - For tab switching (dynamically generated)
- **`toggleSection()` function** - For collapsible sections
- **`toggleQuestion()` function** - For question cards
- **Dynamic badge updates** - Status changes
- **Progress bar animations** - Visual feedback
- **Artifact counter updates** - Live counters

### Dynamic Tab Implementation:
```javascript
// Generate tabs based on framework
function generateTabs(frameworkTabs) {
    const tabContainer = document.querySelector('.tab-container');
    frameworkTabs.forEach(tab => {
        const tabBtn = document.createElement('button');
        tabBtn.className = 'tab-btn';
        tabBtn.textContent = tab.name;
        tabBtn.onclick = (evt) => openTab(evt, tab.id);
        tabContainer.appendChild(tabBtn);
    });
}

// Generate tab content based on framework
function generateTabContent(frameworkTabs) {
    frameworkTabs.forEach(tab => {
        const tabContent = document.createElement('div');
        tabContent.id = tab.id;
        tabContent.className = 'tab-content';
        tabContent.innerHTML = tab.content;
        document.querySelector('.tab-content-container').appendChild(tabContent);
    });
}
```

### Icons Usage:
- **Heroicons** (outline style)
- **Semantic icons** (user, problem, context, etc.)
- **Status indicators** (complete, current, pending)
- **Action icons** (save, gap, suggest)
- **Artifact icons** (follow-up, gap, design, assumption)

---

## 🔄 Update Instructions

### When to Update Document:
- **After every Q&A cycle**
- **When sections complete**
- **When insights are generated**
- **When action items are identified**

### Update Process:
1. **Read existing HTML file**
2. **Parse current content**
3. **Add new Q&A to appropriate tab**
4. **Update progress indicators**
5. **Add insights/action items**
6. **Save updated file**

---

## 📁 File Management

### Naming Convention:
- **Format:** `[Research Method] - [Feature Name].html`
- **Examples:**
  - `Problem Finder - Service Request Modal.html`
  - `User Research - Customer Portal.html`
  - `UX Discovery - Mobile App.html`

### Location Options:
- **Current directory:** `./filename.html`
- **Subdirectory:** `./reports/filename.html`
- **Specific path:** User-provided full path

### Backup Strategy:
- **Auto-save** after each update
- **Version tracking** in filename (optional)
- **Export capability** for sharing

---

## 🎨 Design Specifications

### Color Palette (from Design Helper.md):
- **Background:** #f9fafb (as specified in Design Helper)
- **Completed sections:** Green background
- **Current section:** Blue background
- **Pending sections:** Gray background
- **Insights:** Yellow highlight
- **Action items:** Red accent
- **⊕ Additional questions:** Orange badge

### Typography (from Design Helper.md):
- **Font family:** System UI stack
- **Font size:** 13px (as specified in Design Helper)
- **Line height:** 1.5 (as specified in Design Helper)
- **Headings:** 14px-18px, bold
- **Body:** 13px, regular
- **Captions:** 11px, light

### Layout:
- **Max width:** 1000px
- **Padding:** 8px-16px
- **Margins:** 4px-8px
- **Border radius:** 4px-8px

---

## 🚀 Implementation Notes

### For Claude:
1. **Always ask for file path first**
2. **Create standalone HTML file**
3. **Use Tailwind CSS CDN**
4. **Include Heroicons for icons**
5. **Make it condensed and print-friendly**
6. **Update file after each Q&A**

### For User:
1. **Provide clear file path**
2. **Ensure directory exists**
3. **Open HTML file in browser**
4. **Can print or share file**

---

**Status:** Cursor-Specific Instructions Complete  
**Format:** Standalone HTML template creation  
**Dependencies:** Tailwind CSS CDN, Heroicons CDN

