# Cursor-Specific Instructions for HTML Template Creation

**Purpose:** This file contains Cursor-specific instructions for creating standalone HTML research reports.

**Usage:** When Claude needs to create a Live Research Document, it should reference this file for HTML template creation instructions.

---

## 🎯 HTML Template Creation Workflow

### Step 1: Check for Existing Research

**Before creating any HTML document, Claude MUST ask:**

> 🔍 **Do you have existing research files?**
>
> **Options:**
> 1) **Yes** - Continue existing research
> 2) **No** - Start fresh research
>
> **Your choice:** Type `1` or `2`

### Step 1A: If User Selects "Yes" (Continue Existing Research)

**Automatically scan Reports folder:**

> 🔍 **Scanning Reports folder for existing research...**

**Claude MUST automatically:**
1. **Scan Reports folder** - Look for `.html` files in `/Claude/Reports/` and subfolders
2. **Display available research files** with full paths and details
3. **Ask user to select** which research to continue

**Display format:**
> 📋 **Available Research Files:**
>
> **1.** `Problem Finder - Service Request Modal.html`
>    📍 Path: `/Claude/Reports/Customer Portal/Modals/`
>    📅 Last modified: Dec 19, 2024
>
> **2.** `User Research - Customer Portal.html`
>    📍 Path: `/Claude/Reports/Customer Portal/`
>    📅 Last modified: Dec 18, 2024
>
> **3.** `UX Discovery - Mobile App.html`
>    📍 Path: `/Claude/Reports/Mobile App/`
>    📅 Last modified: Dec 17, 2024
>
> **Which research would you like to continue?** Type the number or filename.

**After user selects file:**
1. **Read the HTML file** to understand research progress
2. **Extract research context** (current dimension, questions asked, findings)
3. **Continue research** from where it left off
4. **Update the existing file** (don't create new one)

### Step 1B: If User Selects "No" (Start Fresh Research)

**Show current folder structure:**

> 📁 **Current Research Folder Structure:**
>
> ```
> /Claude/Reports/
> ├── Customer Portal/
> │   ├── Modals/
> │   │   └── Problem Finder - Service Request Modal.html
> │   └── User Research - Customer Portal.html
> ├── Mobile App/
> │   └── UX Discovery - Mobile App.html
> └── E-commerce/
>     └── User Journey Research.html
> ```
>
> **Where would you like to create the new research?**
>
> **Options:**
> 1) **Use existing folder** - Select from above structure
> 2) **Create new folder** - Specify new folder path
> 3) **Add to specific project** - Choose project folder
>
> **Your choice:** Type `1`, `2`, or `3`

**If user selects "Use existing folder":**
> 📂 **Select folder from structure above:**
>
> **Examples:**
> - `Customer Portal/Modals/` (for modal research)
> - `Mobile App/` (for mobile research)
> - `E-commerce/` (for e-commerce research)
>
> **Folder path:**

**If user selects "Create new folder":**
> 📁 **Specify new folder path:**
>
> **Examples:**
> - `Customer Portal/Authentication/`
> - `Mobile App/Onboarding/`
> - `E-commerce/Checkout/`
>
> **New folder path:**

**If user selects "Add to specific project":**
> 🎯 **Choose project folder:**
>
> **Available projects:**
> 1) **Customer Portal** - `/Claude/Reports/Customer Portal/`
> 2) **Mobile App** - `/Claude/Reports/Mobile App/`
> 3) **E-commerce** - `/Claude/Reports/E-commerce/`
>
> **Project choice:** Type number or project name

**After receiving file path:**
1. **Check if folder exists** and contains `.html` files
2. **If folder has existing research files:**
   - **Ask user choice:**
   > ⚠️ **Folder contains existing research files:**
   >
   > **Options:**
   > 1) **Remove existing files** - Delete all existing research files
   > 2) **Keep existing files** - Create new research with versioning (V1, V2, etc.)
   >
   > **Your choice:** Type `1` or `2`
>
> 3. **If user selects "Keep existing files":**
>    - **Generate version number** (V1, V2, V3, etc.)
>    - **Create filename** with version: `Problem Finder - Service Request Modal V1.html`
> 4. **If user selects "Remove existing files":**
>    - **Delete existing files** in the folder
>    - **Create new research** with original filename

### Step 2: Research Continuation Logic (If Continuing Existing Research)

**When continuing existing research:**

1. **Parse HTML File** - Extract research progress from existing HTML
2. **Identify Current State:**
   - Current dimension/tab being worked on
   - Questions already asked and answered
   - Research artifacts collected (Gaps, Follow-up, Design Feedback, Assumptions)
   - Action items already identified
3. **Resume Research** - Continue from the exact point where research stopped
4. **Update Existing File** - Modify the existing HTML file, don't create new one

**Automatic Folder Scanning Logic:**
```javascript
// Scan Reports folder for existing research files
function scanReportsFolder() {
    const reportsPath = '/Claude/Reports/';
    const htmlFiles = [];
    
    // Recursively scan all subfolders
    function scanDirectory(dir) {
        const files = listFiles(dir);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                htmlFiles.push({
                    name: file,
                    path: dir + file,
                    lastModified: getFileModificationDate(dir + file)
                });
            }
        });
        
        // Scan subdirectories
        const subdirs = listDirectories(dir);
        subdirs.forEach(subdir => {
            scanDirectory(dir + subdir + '/');
        });
    }
    
    scanDirectory(reportsPath);
    return htmlFiles;
}
```

**Research State Detection:**
```javascript
// Extract research progress from HTML
function extractResearchState(htmlContent) {
    // Find current active tab
    const activeTab = htmlContent.match(/class="tab-btn active".*?>(.*?)</);
    
    // Count completed questions
    const completedQuestions = htmlContent.match(/badge-complete/g)?.length || 0;
    
    // Extract research artifacts
    const gaps = htmlContent.match(/Identified Gaps.*?(\d+)/);
    const followups = htmlContent.match(/Follow-up Questions.*?(\d+)/);
    
    return {
        currentTab: activeTab?.[1],
        completedQuestions,
        artifacts: { gaps, followups }
    };
}
```

### Step 3: Versioning System (If Starting Fresh with Existing Files)

**Version Detection Logic:**
```javascript
// Generate next version number
function getNextVersion(folderPath, baseFilename) {
    const files = listFiles(folderPath);
    const versionPattern = new RegExp(`${baseFilename} V(\\d+)\\.html`);
    
    let maxVersion = 0;
    files.forEach(file => {
        const match = file.match(versionPattern);
        if (match) {
            maxVersion = Math.max(maxVersion, parseInt(match[1]));
        }
    });
    
    return `V${maxVersion + 1}`;
}
```

**Versioning Rules:**
- **V1** - First version (if no existing files)
- **V2, V3, V4...** - Subsequent versions
- **Filename Format:** `[Research Method] - [Feature Name] V[Number].html`
- **Example:** `Problem Finder - Service Request Modal V2.html`

### Step 4: Parse Framework and Generate Dynamic HTML

**After handling existing research or versioning, follow this process:**

#### Framework Parsing Process:
1. **Read Framework File** - Parse the selected research framework .md file
2. **Extract Tab Structure** - Look for "Document Structure" section with tab definitions
3. **Generate Dynamic HTML** - Create HTML with framework-specific tabs
4. **Create JavaScript** - Generate tab switching code for framework tabs
5. **Update Document** - Maintain framework-specific structure throughout research

### Step 5: Generate Dynamic Progress Section

**Generate progress items based on framework tabs:**

#### Required Elements:
- **Tailwind CSS CDN** (no local dependencies)
- **Open source icons** (Heroicons or similar)
- **Dynamic tab generation** based on framework
- **Condensed view** (mobile-friendly, print-friendly)
- **Self-contained** (works offline after initial load)

#### Critical Styling Instructions for HTML Artifacts

**MANDATORY: Ensure Tailwind CSS loads properly in artifacts**

**Tailwind CDN Implementation:**
```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```
- Place in `<head>` section BEFORE closing `</head>` tag
- Must be loaded for all Tailwind utility classes to work

**Required Inline Styles (Mandatory):**
Add these in `<style>` tag immediately after Tailwind CDN:
```html
<style>
    body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px; 
        line-height: 1.5; 
        background-color: #f9fafb;
        margin: 0;
        padding: 0;
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .tab-button { 
        cursor: pointer; 
        padding: 0.75rem 1.5rem;
        border: none;
        background: transparent;
    }
    .tab-button.active { 
        background-color: #3b82f6; 
        color: white; 
        border-bottom: 2px solid #3b82f6;
    }
    .progress-bar { 
        transition: width 0.3s ease; 
        background-color: #10b981;
    }
    @media print {
        .no-print { display: none; }
        .tab-content { display: block !important; }
    }
</style>
```

**Why These Styles Are Critical:**
- `body` styles: Base typography and layout even if Tailwind fails
- `.tab-content` / `.tab-button`: Tab functionality requires these
- `.progress-bar`: Visual feedback for research progress
- `@media print`: Print-friendly output

**Icons Strategy:**
- Use Unicode emoji (✅ 🔍 💡 📊 🎯 👂 💭 🤖 ✍️) 
- No external icon libraries needed
- Universal compatibility across all browsers

**Artifact Type:**
- Always use `type="text/html"` for HTML documents
- Ensures proper rendering in Claude artifact viewer

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

## 🤖 AI Interaction Patterns

**CRITICAL: MANDATORY FOR ALL RESEARCH FRAMEWORKS**

**Every question in EVERY research framework MUST include these exact elements:**

### Question Format with AI Suggestions

**MANDATORY FORMAT - NO EXCEPTIONS**

**Every question in EVERY research framework MUST follow this exact format:**

```
## 🔍 **Q[#]: [Clear, focused question]**

### 🎯 **Why I'm asking:**
[Purpose and strategic value]

### 👂 **What I'm listening for:**
- [Specific aspect 1]
- [Specific aspect 2]
- [Specific aspect 3]

### 💭 **Examples to help you think:**
- [Concrete example 1]
- [Concrete example 2]
- [Concrete example 3]

### 🤖 **AI Suggested Options:**
1) **[Option 1]** - [Brief explanation]
2) **[Option 2]** - [Brief explanation]
3) **[Option 3]** - [Brief explanation]
4) **[Custom Response]** - [Your own answer]
5) **Gap** - Flag this as a research gap needing more investigation
6) **Suggest** - Provide design suggestions based on this answer
7) **Design Discussion** - Open discussion about design implications
8) **More Understanding** - Ask follow-up questions for deeper insight

---

### ✍️ **Your answer:**
```

**MANDATORY ELEMENTS - ALL MUST BE PRESENT:**

1. **## 🔍 Q[#]: [Question]** - Heading level 2 with question number
2. **Why I'm asking:** - Purpose and strategic value explanation
3. **What I'm listening for:** - 3 specific aspects to listen for
4. **Examples to help you think:** - 3 concrete examples
5. **AI Suggested Options:** - 8 numbered options (4 content + 4 actions)
6. **Your answer:** - Clear prompt for user response

**NO EXCEPTIONS - ALL RESEARCH FRAMEWORKS MUST FOLLOW THIS FORMAT**

---

## 🌍 Global Research Standards

**APPLIES TO ALL RESEARCH FRAMEWORKS - NO EXCEPTIONS**

### ⚠️ CRITICAL: ONE QUESTION AT A TIME RULE

**NEVER ASK MULTIPLE QUESTIONS SIMULTANEOUSLY**

**❌ INCORRECT (Multiple Questions):**
```
Phase 1: Problem Identification
I'll ask 5 key questions to understand the New Service Request Modal design challenge:

1. User Context: Who are the primary users...
2. Current Pain Points: If there's an existing flow...
3. Request Complexity: What information needs...
4. Integration Constraints: Does this modal need...
5. Success Metrics: How will you measure...

Please share what you can about these aspects...
```

**✅ CORRECT (One Question at a Time):**
```
## 🔍 **Q1: Who are the primary users experiencing issues with the service request modal?**

### 🎯 **Why I'm asking:**
[Purpose and strategic value]

### 👂 **What I'm listening for:**
- [Specific aspect 1]
- [Specific aspect 2]
- [Specific aspect 3]

### 💭 **Examples to help you think:**
- [Concrete example 1]
- [Concrete example 2]
- [Concrete example 3]

### 🤖 **AI Suggested Options:**
1) **[Option 1]** - [Brief explanation]
2) **[Option 2]** - [Brief explanation]
3) **[Option 3]** - [Brief explanation]
4) **[Custom Response]** - [Your own answer]
5) **Gap** - Flag this as a research gap needing more investigation
6) **Suggest** - Provide design suggestions based on this answer
7) **Design Discussion** - Open discussion about design implications
8) **More Understanding** - Ask follow-up questions for deeper insight

---

### ✍️ **Your answer:**
```

### Mandatory Question Elements

**Every question in EVERY research framework MUST include:**

1. **## 🔍 Q[#]: [Question]** - Heading level 2 with question number
2. **Why I'm asking:** - Purpose and strategic value explanation  
3. **What I'm listening for:** - 3 specific aspects to listen for
4. **Examples to help you think:** - 3 concrete examples
5. **AI Suggested Options:** - 8 numbered options (4 content + 4 actions)
6. **Your answer:** - Clear prompt for user response

### Mandatory Action Options

**Every question MUST include these 8 options:**

**Content Options (1-4):**
1) **[Option 1]** - [Brief explanation]
2) **[Option 2]** - [Brief explanation]  
3) **[Option 3]** - [Brief explanation]
4) **[Custom Response]** - [Your own answer]

**Action Options (5-8):**
5) **Gap** - Flag this as a research gap needing more investigation
6) **Suggest** - Provide design suggestions based on this answer
7) **Design Discussion** - Open discussion about design implications
8) **More Understanding** - Ask follow-up questions for deeper insight

### Framework Compliance

**ALL research frameworks must:**
- ✅ **Follow exact question format** - No variations allowed
- ✅ **Include all 6 mandatory elements** - Complete structure required
- ✅ **Provide all 8 action options** - Full interaction capability
- ✅ **Use consistent formatting** - Standard appearance across frameworks
- ✅ **Maintain interaction patterns** - Same user experience everywhere
- ✅ **ASK ONE QUESTION AT A TIME** - Never multiple questions simultaneously
- ✅ **Use visual formatting** - Icons and hierarchy as specified
- ✅ **Wait for user response** - Complete current question before next

### ⚠️ STRICT COMPLIANCE REQUIREMENTS

**VIOLATIONS THAT ARE NOT ALLOWED:**
- ❌ **Multiple questions at once** - "I'll ask 5 key questions..."
- ❌ **Phase descriptions without questions** - "Phase 1: Problem Identification"
- ❌ **Missing visual formatting** - No icons or hierarchy
- ❌ **Missing AI suggested options** - Less than 8 options
- ❌ **Missing confirmation patterns** - No understanding confirmation
- ❌ **Deviating from format** - Any variation from standard format

**ENFORCEMENT:**
- **Immediate correction required** - Stop and reformat if violations detected
- **No exceptions** - Even if framework suggests different approach
- **Consistent application** - Same format across all research methods
- **User experience priority** - Format consistency over framework flexibility

**NO FRAMEWORK CAN DEVIATE FROM THESE STANDARDS**

### Suggest Mode (When User Selects "Suggest")

**When user selects "Suggest", Claude MUST:**

1. **Provide design suggestions** based on the user's answer
2. **Include explanations** for each suggestion
3. **Connect to user needs** identified in the answer
4. **Show design implications** and rationale

**Suggest Mode Format:**
```
**💡 Design Suggestions Based on Your Answer**

**Your answer:** [Summary of user's response]

**Design Suggestions:**

**1. [Suggestion 1]**
**Explanation:** [Why this suggestion addresses the user's needs]
**Design Implication:** [How this affects the design]

**2. [Suggestion 2]**
**Explanation:** [Why this suggestion addresses the user's needs]
**Design Implication:** [How this affects the design]

**3. [Suggestion 3]**
**Explanation:** [Why this suggestion addresses the user's needs]
**Design Implication:** [How this affects the design]

**Next action options:**
5) **Gap** - Flag this as a research gap needing more investigation
6) **Suggest** - Provide more design suggestions
7) **Design Discussion** - Open discussion about design implications
8) **More Understanding** - Ask follow-up questions for deeper insight
```

### More Understanding Discussion Mode (When User Selects "More Understanding")

**When user selects "More Understanding", Claude MUST:**

1. **Enter discussion mode** - Ask follow-up questions for deeper insight
2. **Show entire discussion** in plain text format
3. **Continue showing default options** during discussion
4. **Finalize discussion** before moving to next question

**Discussion Mode Format:**

**Discussion Mode: Deeper Understanding**

**Follow-up Question:** [Specific question for deeper insight]

**Your response:**

**Discussion continues...**

**Final Understanding:** [Summary of complete discussion]

**Next action options:**
5) **Gap** - Flag this as a research gap needing more investigation
6) **Suggest** - Provide design suggestions based on this answer
7) **Design Discussion** - Open discussion about design implications
8) **More Understanding** - Continue discussion for deeper insight

### Question Completion Formatting

**When a question is completed, Claude MUST:**

1. **Add underline to completed question** - Visual indicator of completion
2. **Show confirmation of understanding** - Confirm what was heard
3. **Process the chosen action** - Execute the user's selected action
4. **Update research artifacts** - Track gaps, suggestions, discussions, follow-ups
5. **Move to next question** - Continue research progression

**Completed Question Format:**
```
## 🔍 Q[#]: [Clear, focused question] ✅ **COMPLETED**
________________________________________________

**✅ Understanding Confirmed**

**What I heard:** [Summary of user's response]

**Key insights extracted:**
- [Insight 1 from this response]
- [Insight 2 from this response]

**Action taken:** [Gap/Suggest/Design Discussion/More Understanding]

**Research artifacts updated:**
- [Any new gaps, suggestions, discussions, or follow-ups added]

**Next question will be stronger because:** [Specific reason]
```

**Question Focus Enhancement:**
- **Heading Level 2** - Use ## for question titles
- **Clear Separation** - Use horizontal lines to separate question from answer
- **Visual Completion** - Underline completed questions for clear progress tracking
- **Action Clarity** - Always show the 8 default action options after each question

### Confirmation of Understanding Pattern

**After EVERY user response, Claude MUST:**

1. **Acknowledge Understanding** - Confirm what was heard
2. **Extract Key Insights** - Identify important information
3. **Connect to Previous Responses** - Link to earlier answers
4. **Strengthen Research** - Build on previous knowledge
5. **Show Research Evolution** - Demonstrate how understanding is growing

**Confirmation Format:**
```
**✅ Understanding Confirmed**

**What I heard:** [Summary of user's response]

**Key insights extracted:**
- [Insight 1 from this response]
- [Insight 2 from this response]
- [Insight 3 from this response]

**Connections to previous responses:**
- [How this connects to previous answer 1]
- [How this connects to previous answer 2]
- [Pattern emerging from multiple responses]

**Research strengthening:**
- [How this builds on previous knowledge]
- [New questions this opens up]
- [Deeper understanding achieved]

**Next question will be stronger because:** [Specific reason]
```

### Research Evolution Tracking

**Claude MUST track and reference:**

1. **Previous Answers** - Always reference earlier responses
2. **Emerging Patterns** - Identify themes across responses
3. **Knowledge Building** - Show how understanding deepens
4. **Context Accumulation** - Build richer context with each answer
5. **Adaptive Questioning** - Questions get more targeted over time

---

## 📝 Standard Heading Format

**CRITICAL: Use Simple Bold Markdown Headings Only**

**✅ CORRECT Format:**
```
**🔬 PROBLEM FINDER RESEARCH**

**Phase 1: Foundation**
**Purpose:** UNDERSTAND CONTEXT → DEFINE CORE NEED

**Question 1: User Identification**
**Why I'm asking:** To understand who experiences this problem
```

**❌ INCORRECT Format:**
```
═══════════════════════════════════════════════════════
🔬 PROBLEM FINDER RESEARCH
═══════════════════════════════════════════════════════

### Phase 1: Foundation
**Purpose:** UNDERSTAND CONTEXT → DEFINE CORE NEED

#### Question 1: User Identification
**Why I'm asking:** To understand who experiences this problem
```

**Standard Heading Rules:**
- **Use bold markdown** (`**text**`) for all headings
- **No code blocks** (```) for headings
- **No equal signs** (═══) for decorative borders
- **No hash symbols** (#) for markdown headers
- **Keep it simple** - Bold text only
- **Use emojis** for visual distinction
- **Maintain hierarchy** with bold formatting

**Exception:** Code blocks (```) are ONLY allowed for:
- **Summaries** - When displaying research summaries
- **Code examples** - When showing JavaScript or technical code
- **Data structures** - When showing JSON or structured data

---

## 🔄 Research Continuation Workflow Summary

### For Existing Research:
1. **Ask:** "Do you have existing research files?"
2. **If Yes:** Automatically scan Reports folder → Display all HTML files with paths → User selects → Continue from where research stopped
3. **If No:** Show current folder structure → User chooses location → Handle versioning → Create fresh research

### Automatic Folder Scanning:
- **Reports Folder** - Automatically scans `/Claude/Reports/` and all subfolders
- **File Discovery** - Finds all `.html` research files with full paths
- **Structure Display** - Shows organized folder tree for new research
- **Smart Selection** - User picks from discovered files or folder structure

### Versioning System:
- **V1, V2, V3...** - Automatic version detection
- **Filename Format:** `[Research Method] - [Feature Name] V[Number].html`
- **Conflict Resolution:** User chooses to remove existing files or keep with versioning

### Research State Detection:
- **Parse HTML** to extract current progress
- **Identify current tab/dimension** being worked on
- **Count completed questions** and research artifacts
- **Resume research** from exact stopping point

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

