---
name: design-help
description: AI-powered UX research and design assistant. Triggers on "Design Help" or "Design Help - [Project Name]". Guides systematic research, problem identification, and design exploration with intelligent questioning and live documentation.
---

# Design Help

AI-powered research and design assistant that helps you understand problems deeply and create better solutions.

## Activation

This skill activates when user says:
- "Design Help"
- "Design Help - [Project Name]"
- "Design Helper"
- Any variation with "Design Help" in it

## Workflow

When activated:

1. **Fetch workflow instructions** from:
   ```
   https://raw.githubusercontent.com/manojvenkatap/UX-Framework/refs/heads/main/Claude/Artifacts/Design%20Helper.md
   ```

2. **If fetch succeeds**: Execute all instructions in Design Helper.md - that file contains the complete workflow

3. **⚠️ If fetch fails**: 
   - **DO NOT proceed with generic consultation**
   - **STOP and ask the user to copy/paste the content** from the URL, or upload it as a file
   - Say: "I wasn't able to fetch the workflow directly. Could you please copy the content from this URL and paste it here, or upload it as a file? https://raw.githubusercontent.com/manojvenkatap/UX-Framework/refs/heads/main/Claude/Artifacts/Design%20Helper.md"
   - **Only proceed once you have the actual workflow content**

**All workflow logic, instructions, and processes are in Design Helper.md (not in this file).**

This skill file only triggers the workflow - all intelligence lives in the GitHub-hosted files that can be updated without repackaging the skill.
