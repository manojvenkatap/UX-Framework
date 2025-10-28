# UX Research - Problem Finder

## Research Method Overview

Comprehensive problem discovery framework that explores problems from multiple dimensions to build deep understanding before moving to solutions.

**Research Goal:** Thoroughly understand the problem space, users, context, and constraints to inform effective design decisions.

---

## Research Phases

### Phase 1: Background Context (MANDATORY FIRST)

**Purpose:** Establish essential context before any dimension exploration

**CRITICAL:** These questions MUST be asked FIRST for every research engagement, regardless of research type. This is not part of Problem Dimension - this is setup that happens BEFORE dimensional exploration begins.

**Required Background Questions (in this order):**

**BG.1 - Problem Statement**
**Question:** What is the problem you are trying to solve?
**Why asking:** Need clear understanding of the core challenge
**Listening for:** Specific problem description, user impact, business need

**BG.2 - Problem Type**
**Question:** Is this an existing problem you're trying to fix, or a new feature/capability you're building?
**Why asking:** Existing problems require understanding current pain points; new features require understanding goals and opportunities
**Listening for:** Whether there's a current broken state or if this is net-new functionality

**BG.3 - Existing Designs (if applicable)**
**Question:** [If existing problem] Are there any current designs or implementations for this? If yes, can you share them?
**Why asking:** Existing designs provide crucial context about what's been tried and why it's not working
**Listening for:** Links to designs, explanations of current approach, known issues

**BG.4 - Requirements**
**Question:** Do you have any specific requirements or constraints for solving this problem?
**Why asking:** Need to understand guardrails, must-haves, and deal-breakers upfront
**Listening for:** Technical constraints, business requirements, accessibility needs, timeline constraints

**BG.5 - Additional Context**
**Question:** Is there anything else important I should know before we start the research?
**Why asking:** Catch any critical context that wasn't covered
**Listening for:** Stakeholder concerns, political context, related initiatives, assumptions

**After Background Phase:**
- Update Overall Summary with background context
- Create collapsible dimension sections
- Begin User Dimension exploration

### Phase 2: Dimensional Exploration

After background context is complete, explore each dimension systematically.

---

## Mandatory Exploration Dimensions

### USER DIMENSION

**Purpose:** Understand WHO the users are (NOT the tool, NOT the context)

**Focus ONLY on user characteristics:**
- Who are they? (roles, titles, personas)
- What is their expertise level?
- What is their domain knowledge?
- How do they think and make decisions?
- What are their capabilities and limitations?
- Are there different user types or segments?

**Do NOT explore in User Dimension:**
- ❌ The tool they're using
- ❌ The current process or workflow
- ❌ The context of use
- ❌ Technical constraints
- ❌ Business requirements

**Those topics belong in:**
- Problem Dimension (current process, pain points)
- Context Dimension (where/when/how they work)
- Constraints Dimension (technical/business limitations)

**Research approach:**
- Start broad: Who are the people?
- Go specific: What defines them as users?
- Map variations: How do different user types differ?
- Identify characteristics: What matters about them for this design?

**Explore until you can:**
- Describe user types confidently
- Map key user characteristics
- Identify user capabilities and knowledge levels
- Explain what makes users different from each other

---

### PROBLEM DIMENSION

**Purpose:** Define what's wrong and why

**Explore until you can:**
- State problem clearly
- Explain root cause
- Quantify impact
- Define scope

**Research approach:**
- Define: What specific problem exists?
- Dig: Why does this problem exist? (5 whys)
- Assess: How big is this problem?
- Scope: What's in/out of bounds?

---

### CONTEXT DIMENSION

**Purpose:** Understand the environment and constraints

**Explore until you can:**
- Describe current workflow
- Identify technical constraints
- Understand business requirements
- Map stakeholder needs

**Research approach:**
- Current state: How do things work today?
- Constraints: What limits our solutions?
- Dependencies: What else is affected?
- Success criteria: How will we measure improvement?

---

## Research Techniques

### Background Context Collection

**Before any dimensional exploration:**
- Ask all 5 Background Questions (BG.1 through BG.5)
- Document responses in Overall Summary section
- Establish shared understanding of the problem space
- Identify any upfront requirements or constraints

**This is mandatory setup, not optional:**
- Cannot skip to User Dimension without background
- Background questions come first in EVERY research engagement
- After background, create dimension sections and begin User Dimension

### Adaptive Questioning

- Generate questions specific to THIS problem
- Build on previous answers intelligently
- Follow complexity when detected
- Probe gaps and assumptions
- Connect insights across dimensions

### One Question at a Time

- Ask single focused question
- Wait for answer
- Process answer deeply
- Determine next question based on answer
- Show your thinking process

### Sufficiency Checking

**After exploring each dimension, assess:**
- ✅ Do I have complete understanding?
- ✅ Are there gaps or ambiguities?
- ✅ Have I explored variations?
- ✅ Can I articulate this clearly?

**If ALL criteria met:** → Move to next dimension  
**If gaps remain:** → Continue exploring this dimension

---

## Completion Criteria

**Background Phase complete when:**
- ✅ All 5 Background Questions answered
- ✅ Overall Summary populated with context
- ✅ Ready to begin dimensional exploration

**Discovery complete when:**
- ✅ Background context established
- ✅ All dimensions thoroughly explored
- ✅ No major gaps remain
- ✅ Can write clear problem statement
- ✅ Cross-dimension patterns identified
- ✅ Sufficient foundation for design phase

---

## Token Management and Continuation

**Monitor Token Usage:**
- Check token counter after every response
- Document displays current usage in header
- Warning at 90% capacity (171K of 190K tokens)
- Force stop at 95% capacity (180K of 190K tokens)

**At 90% Threshold - Issue Warning:**
```
⚠️ TOKEN CAPACITY WARNING (90%)

Approaching conversation limits. To continue research:
1. Start new chat
2. Say "Continue Design Help - [Project Name]"
3. Share the live research document

The document has everything - no other materials needed.

Ready to proceed with next question, or continue later?
```

**At 95% Threshold - Force Stop:**
```
🛑 TOKEN LIMIT REACHED (95%)

Must continue in new chat. Your research document contains all 
progress. Start new chat with "Continue Design Help - [Project Name]" 
and share the document.
```

**Why No Handoff Summary Needed:**
The live research document IS the handoff. It contains:
- Overall Summary with background context
- All completed dimensions with summaries
- Current dimension with all Q&A
- All insights and action items
- Clear indication of last question and next step

**Document = Complete Continuity**

---

## Notes

- Follow general research standards from Design Helper.md
- Use ⊕ additional questions when patterns emerge