# Global Instructions - UX Research Helper

## Plugin Overview

The UX Research Helper is a Figma plugin that provides systematic UX research capabilities powered by Cursor AI. It follows a structured approach to problem discovery and design research.

---

## Navigation Flow

### 1. Landing Screen
- **Header**: Logo (left) + Version (right)
- **Welcome Message**: Brief introduction to the plugin
- **Tool Selection**: List of available research tools
- **Footer**: Status indicators (Gaps, Follow-ups, Design Discussion, Save)

### 2. Tool Selection Screen
- **Available Tools**: 
  - UX Research (primary tool)
  - Additional tools can be added here
- **Tool Description**: Brief explanation of each tool
- **Navigation**: Back to landing, proceed to tool

### 3. Research Method Selection
- **Available Methods**:
  - Problem Finder (comprehensive discovery)
  - Additional methods can be added
- **Method Description**: Detailed explanation of approach
- **Start Research**: Begin selected method

### 4. Research Flow
- **Question Display**: One question at a time
- **Answer Options**: Multiple choice + custom response
- **AI Processing**: Cursor AI analyzes each answer
- **Progress Tracking**: Visual progress indicators
- **Status Updates**: Real-time artifact tracking

---

## Status Management

### Fixed Footer Components
- **Gaps**: Research gaps identified (clickable for details)
- **Follow-ups**: Additional questions generated (clickable for details)
- **Design Discussion**: Design implications (clickable for details)
- **Save for Later**: Save current progress

### Modal System
- **Status Card Click**: Opens modal with detailed information
- **Modal Content**: Shows specific artifacts for that status type
- **Close Action**: Returns to research flow
- **Navigation**: Continue research from where left off

---

## Data Management

### External Files
- **Instructions**: All research methods stored in `/instructions/` folder
- **Global Instructions**: This file for plugin-wide rules
- **Method Instructions**: Specific files for each research method
- **No Hardcoded Data**: All content loaded dynamically

### File Structure
```
instructions/
├── Global - Global instructions.md
├── UX Research - Problem Finder.md
└── [Additional methods].md
```

---

## AI Integration

### Cursor AI Processing
- **Answer Analysis**: Each answer processed by Cursor AI
- **Insight Generation**: AI extracts key insights
- **Follow-up Questions**: AI suggests additional questions
- **Design Implications**: AI identifies design opportunities
- **Assumption Validation**: AI flags assumptions needing testing

### API Configuration
- **API Key**: Embedded in plugin configuration
- **Endpoint**: Cursor AI API for research assistance
- **Error Handling**: Graceful fallback for API issues
- **Rate Limiting**: Respect API limits and quotas

---

## User Experience

### Design Principles
- **Progressive Disclosure**: Show information as needed
- **Clear Navigation**: Always know where you are
- **Status Awareness**: Always see current progress
- **Easy Recovery**: Can save and resume research
- **Professional Interface**: Clean, modern design

### Interaction Patterns
- **One Action at a Time**: Focus on current task
- **Clear Feedback**: Immediate response to actions
- **Context Preservation**: Maintain research state
- **Error Recovery**: Handle issues gracefully

---

## Technical Requirements

### Performance
- **Fast Loading**: Quick initial load time
- **Responsive UI**: Works on different screen sizes
- **Efficient Updates**: Minimal re-rendering
- **Memory Management**: Efficient data handling

### Reliability
- **Error Handling**: Graceful failure modes
- **Data Persistence**: Save progress automatically
- **Network Resilience**: Handle connectivity issues
- **State Recovery**: Resume from interruptions

---

## Maintenance

### File Organization
- **Modular Structure**: Separate files for different concerns
- **Clear Naming**: Descriptive file and function names
- **Documentation**: Comprehensive comments and docs
- **Version Control**: Track changes and updates

### Extensibility
- **Plugin Architecture**: Easy to add new research methods
- **Configuration Driven**: Behavior controlled by external files
- **API Abstraction**: Easy to change AI providers
- **UI Components**: Reusable interface elements
