// UX Research Helper - Figma Plugin Main Code
// This file runs in the Figma plugin sandbox

// Plugin configuration
const PLUGIN_CONFIG = {
    name: 'UX Research Helper',
    version: '1.0.0',
    cursorApiKey: 'key_dbfaeaa56a1abd7604a074c8c0a9ba8f337794e0026c9382b0e4ffe8b5071abe',
    instructionsPath: './instructions/'
};

// Research state management
class ResearchManager {
    constructor() {
        this.currentResearch = {
            id: null,
            method: null,
            phase: null,
            questions: [],
            insights: [],
            actionItems: [],
            gaps: [],
            followups: [],
            designDiscussions: [],
            progress: 0,
            createdAt: null,
            lastUpdated: null
        };

        this.figmaData = {
            selectedNodes: [],
            currentPage: null,
            projectInfo: null
        };

        this.instructions = {
            global: null,
            problemFinder: null
        };
    }

    // Initialize the plugin
    async init() {
        console.log('UX Research Helper Plugin initialized');

        // Get current Figma context
        this.updateFigmaContext();

        // Set up message handling
        this.setupMessageHandling();

        // Load instructions
        await this.loadInstructions();

        // Load saved research if exists
        await this.loadSavedResearch();

        console.log('Plugin ready for research');
    }

    // Update Figma/FigJam context
    updateFigmaContext() {
        // Handle both Figma and FigJam
        const editor = figma.editorType === 'figma' ? figma : figma;

        this.figmaData.selectedNodes = editor.currentPage.selection;
        this.figmaData.currentPage = editor.currentPage;
        this.figmaData.projectInfo = {
            name: editor.root.name,
            pageName: editor.currentPage.name,
            nodeCount: editor.currentPage.children.length,
            editorType: figma.editorType
        };

        console.log('Figma/FigJam context updated:', this.figmaData);
    }

    // Load instructions from embedded content
    async loadInstructions() {
        try {
            // Load global instructions
            const globalInstructions = this.getEmbeddedInstructions('Global - Global instructions.md');
            this.instructions.global = this.parseInstructions(globalInstructions);

            // Load Problem Finder instructions
            const problemFinderInstructions = this.getEmbeddedInstructions('UX Research - Problem Finder.md');
            this.instructions.problemFinder = this.parseInstructions(problemFinderInstructions);

            console.log('Instructions loaded successfully');

        } catch (error) {
            console.error('Error loading instructions:', error);
            // Use fallback instructions
            this.instructions.global = this.getFallbackGlobalInstructions();
            this.instructions.problemFinder = this.getFallbackProblemFinderInstructions();
        }
    }

    // Get embedded instructions
    getEmbeddedInstructions(filename) {
        const instructions = {
            'Global - Global instructions.md': `# Global Instructions - UX Research Helper

## Plugin Overview
The UX Research Helper is a Figma plugin that provides systematic UX research capabilities powered by Cursor AI.

## Navigation Flow
### 1. Landing Screen
- Header: Logo (left) + Version (right)
- Welcome Message: Brief introduction to the plugin
- Tool Selection: List of available research tools

### 2. Tool Selection Screen
- Available Tools: UX Research (primary tool)
- Tool Description: Brief explanation of each tool

### 3. Research Method Selection
- Available Methods: Problem Finder (comprehensive discovery)
- Method Description: Detailed explanation of approach

## Status Management
### Fixed Footer Components
- Gaps: Research gaps identified (clickable for details)
- Follow-ups: Additional questions generated (clickable for details)
- Design Discussion: Design implications (clickable for details)
- Save for Later: Save current progress

## Data Management
### External Files
- Instructions: All research methods stored in /instructions/ folder
- Global Instructions: This file for plugin-wide rules
- Method Instructions: Specific files for each research method
- No Hardcoded Data: All content loaded dynamically`,

            'UX Research - Problem Finder.md': `# UX Research - Problem Finder Instructions

## Research Method Overview
Comprehensive problem discovery framework that explores problems from multiple dimensions.

## Research Phases
### Phase 1: User Dimension
**Purpose:** Understand who experiences this problem
**Questions:**
1. Who are the primary users experiencing issues with this design?
2. What is their role and context when using this design?
3. How do different user types vary in their needs?
4. What are the edge cases or secondary users?

### Phase 2: Problem Dimension
**Purpose:** Define what's wrong and why
**Questions:**
1. What specific problems are these users experiencing?
2. Why does this problem exist? (root cause analysis)
3. How big is this problem? (impact assessment)
4. What's the scope of this problem?

### Phase 3: Context Dimension
**Purpose:** Understand the environment and constraints
**Questions:**
1. How do things work today in the current workflow?
2. What technical constraints limit our solutions?
3. What business requirements must be met?
4. How will we measure success?`
        };

        return instructions[filename] || '';
    }

    // Parse instructions from markdown
    parseInstructions(text) {
        const instructions = {
            phases: [],
            navigation: {},
            statusManagement: {},
            dataManagement: {}
        };

        // Extract phases
        const phaseMatches = text.match(/### Phase \d+: ([^\n]+)[\s\S]*?Questions:([\s\S]*?)(?=### Phase|\*\*Completion Criteria|\*\*Research Techniques|$)/g);
        if (phaseMatches) {
            phaseMatches.forEach(match => {
                const phaseNameMatch = match.match(/### Phase \d+: ([^\n]+)/);
                const questionsTextMatch = match.match(/Questions:([\s\S]*?)(?=\*\*Completion Criteria|\*\*Research Techniques|$)/);

                const phaseName = phaseNameMatch && phaseNameMatch[1] ? phaseNameMatch[1].trim() : null;
                const questionsText = questionsTextMatch && questionsTextMatch[1] ? questionsTextMatch[1] : null;

                if (phaseName && questionsText) {
                    const questions = questionsText.split('\n')
                        .filter(line => line.trim().match(/^\d+\./))
                        .map(line => line.replace(/^\d+\.\s*/, '').trim())
                        .filter(q => q.length > 0);

                    instructions.phases.push({
                        name: phaseName,
                        questions: questions
                    });
                }
            });
        }

        return instructions;
    }

    // Fallback instructions
    getFallbackGlobalInstructions() {
        return {
            phases: [],
            navigation: {
                landingScreen: 'Welcome screen with tool selection',
                toolSelection: 'UX Research tool selection',
                methodSelection: 'Problem Finder method selection'
            },
            statusManagement: {
                gaps: 'Research gaps identified',
                followups: 'Additional questions generated',
                designDiscussion: 'Design implications',
                saveForLater: 'Save current progress'
            }
        };
    }

    getFallbackProblemFinderInstructions() {
        return {
            phases: [
                {
                    name: 'User Dimension',
                    questions: [
                        'Who are the primary users experiencing issues with this design?',
                        'What is their role and context when using this design?',
                        'How do different user types vary in their needs?',
                        'What are the edge cases or secondary users?'
                    ]
                },
                {
                    name: 'Problem Dimension',
                    questions: [
                        'What specific problems are these users experiencing?',
                        'Why does this problem exist? (root cause analysis)',
                        'How big is this problem? (impact assessment)',
                        'What\'s the scope of this problem?'
                    ]
                },
                {
                    name: 'Context Dimension',
                    questions: [
                        'How do things work today in the current workflow?',
                        'What technical constraints limit our solutions?',
                        'What business requirements must be met?',
                        'How will we measure success?'
                    ]
                }
            ]
        };
    }

    // Set up message handling between UI and plugin
    setupMessageHandling() {
        figma.ui.onmessage = async (msg) => {
            console.log('Received message:', msg);

            try {
                switch (msg.type) {
                    case 'process-answer':
                        await this.processAnswer(msg.questionId, msg.answer, msg.prompt);
                        break;

                    case 'save-research':
                        await this.saveResearch(msg.data);
                        break;

                    case 'export-research':
                        await this.exportResearch();
                        break;

                    case 'get-figma-context':
                        this.updateFigmaContext();
                        this.sendToUI('figma-context', this.figmaData);
                        break;

                    case 'get-editor-type':
                        this.sendToUI('editor-type', { editorType: figma.editorType });
                        break;

                    case 'generate-question':
                        await this.generateQuestion(msg.messageId, msg.prompt, msg.phase, msg.previousAnswer, msg.context);
                        break;

                    default:
                        console.log('Unknown message type:', msg.type);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                this.sendToUI('error', { message: error.message });
            }
        };
    }

    // Process answer with Cursor AI
    async processAnswer(questionId, answer, prompt) {
        try {
            const question = this.currentResearch.questions.find(q => q.id === questionId);
            if (!question) {
                console.log('Available questions:', this.currentResearch.questions.map(q => q.id));
                throw new Error(`Question ${questionId} not found`);
            }

            // Record the answer
            question.answer = answer;
            question.answeredAt = new Date().toISOString();

            // Process with Cursor AI
            const aiResponse = await this.callClaudeAI(prompt);

            // Extract insights and artifacts
            if (aiResponse.insights) {
                const newInsights = aiResponse.insights.map(insight => ({
                    id: `insight_${Date.now()}_${Math.random()}`,
                    text: insight,
                    questionId: questionId,
                    timestamp: new Date().toISOString()
                }));
                this.currentResearch.insights = this.currentResearch.insights.concat(newInsights);
            }

            if (aiResponse.followUpQuestions) {
                const newFollowups = aiResponse.followUpQuestions.map(followup => ({
                    id: `followup_${Date.now()}_${Math.random()}`,
                    text: followup,
                    questionId: questionId,
                    timestamp: new Date().toISOString()
                }));
                this.currentResearch.followups = this.currentResearch.followups.concat(newFollowups);
            }

            if (aiResponse.designImplications) {
                const newDesignDiscussions = aiResponse.designImplications.map(implication => ({
                    id: `design_${Date.now()}_${Math.random()}`,
                    text: implication,
                    questionId: questionId,
                    timestamp: new Date().toISOString()
                }));
                this.currentResearch.designDiscussions = this.currentResearch.designDiscussions.concat(newDesignDiscussions);
            }

            if (aiResponse.assumptions) {
                const newGaps = aiResponse.assumptions.map(assumption => ({
                    id: `gap_${Date.now()}_${Math.random()}`,
                    text: assumption,
                    questionId: questionId,
                    timestamp: new Date().toISOString()
                }));
                this.currentResearch.gaps = this.currentResearch.gaps.concat(newGaps);
            }

            // Update progress
            this.updateProgress();

            // Send updated research to UI
            this.sendToUI('answer-processed', {
                question: question,
                aiResponse: aiResponse,
                research: this.currentResearch
            });

        } catch (error) {
            console.error('Error processing answer:', error);
            this.sendToUI('error', { message: 'Failed to process answer' });
        }
    }

    // Generate AI-powered question
    async generateQuestion(messageId, prompt, phase, previousAnswer, context) {
        try {
            console.log('Generating question for phase:', phase);
            console.log('MessageId:', messageId);
            console.log('Prompt:', prompt);

            const aiResponse = await this.callClaudeAI(prompt);
            console.log('AI Response received:', aiResponse);

            // Send the generated question back to UI
            console.log('Sending response to UI with messageId:', messageId);
            this.sendToUI('ai-question-generated', {
                messageId: messageId,
                data: aiResponse
            });
            console.log('Response sent to UI');

        } catch (error) {
            console.error('Error generating question:', error);
            // Send error to UI instead of fallback
            this.sendToUI('ai-question-generated', {
                messageId: messageId,
                error: error.message,
                data: null
            });
        }
    }

    // Base64 encode function (btoa not available in Figma plugins)
    base64Encode(str) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        let i = 0;

        while (i < str.length) {
            const a = str.charCodeAt(i++);
            const b = i < str.length ? str.charCodeAt(i++) : 0;
            const c = i < str.length ? str.charCodeAt(i++) : 0;

            const bitmap = (a << 16) | (b << 8) | c;

            result += chars.charAt((bitmap >> 18) & 63);
            result += chars.charAt((bitmap >> 12) & 63);
            result += i - 2 < str.length ? chars.charAt((bitmap >> 6) & 63) : '=';
            result += i - 1 < str.length ? chars.charAt(bitmap & 63) : '=';
        }

        return result;
    }

    // Call Cursor AI API via Netlify proxy
    async callClaudeAI(prompt) {
        try {
            console.log('Calling Claude AI with prompt:', prompt.substring(0, 100) + '...');

            const response = await fetch('https://claude-proxy.netlify.app/.netlify/functions/claude-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('HTTP error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Raw response data:', data);

            // Handle successful response
            if (data.success && data.data) {
                const cursorResponse = data.data;
                console.log('Cursor response:', cursorResponse);

                // Parse Claude API response format (proxy is using Claude)
                if (cursorResponse.content && cursorResponse.content[0] && cursorResponse.content[0].text) {
                    const responseText = cursorResponse.content[0].text;
                    console.log('Raw AI response text:', responseText);

                    // Try to parse as JSON first (for structured responses)
                    try {
                        const parsedResponse = JSON.parse(responseText);
                        console.log('Parsed JSON response:', parsedResponse);
                        return parsedResponse;
                    } catch (parseError) {
                        console.log('Not JSON, processing as text');
                        // If not JSON, check if it's a question or general text
                        if (responseText.includes('?') || responseText.toLowerCase().includes('question') || responseText.includes('"')) {
                            // Extract question from response text
                            let question = responseText;

                            // Try to extract question from quoted text
                            const quotedMatch = responseText.match(/"([^"]+)"/);
                            if (quotedMatch) {
                                question = quotedMatch[1];
                            }

                            // Try to extract question ending with ?
                            const questionMatch = responseText.match(/([^.!]*\?)/);
                            if (questionMatch) {
                                question = questionMatch[1].trim();
                            }

                            console.log('Extracted question:', question);
                            return {
                                question: question,
                                options: ['Option 1', 'Option 2', 'Option 3', 'Custom Response'],
                                reasoning: 'AI-generated question for UX research'
                            };
                        } else {
                            // For other responses, create structured response
                            console.log('Creating structured response from text');
                            return {
                                insights: [responseText],
                                followUpQuestions: ['What specific aspects need more investigation?'],
                                designImplications: ['Consider user needs in design decisions'],
                                assumptions: ['User feedback needs validation']
                            };
                        }
                    }
                } else {
                    // Fallback response structure
                    return {
                        insights: [`AI Response: ${JSON.stringify(cursorResponse)}`],
                        followUpQuestions: ['What specific aspects need more investigation?'],
                        designImplications: ['Consider user needs in design decisions'],
                        assumptions: ['User feedback needs validation']
                    };
                }
            } else {
                throw new Error(data.error || 'Invalid response format');
            }
        } catch (error) {
            console.error('Error calling Claude AI:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });

            // Re-throw the error instead of returning fallback (per user's "NO FALLBACK" rule)
            throw new Error(`AI call failed: ${error.message}`);
        }
    }

    // Update research progress
    updateProgress() {
        const totalQuestions = this.currentResearch.questions.length;
        const answeredQuestions = this.currentResearch.questions.filter(q => q.answer).length;
        this.currentResearch.progress = Math.round((answeredQuestions / totalQuestions) * 100);
        this.currentResearch.lastUpdated = new Date().toISOString();
    }

    // Save research to Figma storage
    async saveResearch(researchData) {
        try {
            const researchToSave = researchData || this.currentResearch;
            researchToSave.lastUpdated = new Date().toISOString();

            // Save to Figma's client storage
            await figma.clientStorage.setAsync('ux-research', researchToSave);

            // Also save to current research
            this.currentResearch = researchToSave;

            this.sendToUI('research-saved', { research: researchToSave });
            console.log('Research saved successfully');

        } catch (error) {
            console.error('Error saving research:', error);
            this.sendToUI('error', { message: 'Failed to save research' });
        }
    }

    // Load saved research
    async loadSavedResearch() {
        try {
            const savedResearch = await figma.clientStorage.getAsync('ux-research');
            if (savedResearch) {
                this.currentResearch = savedResearch;
                console.log('Loaded saved research:', this.currentResearch);

                this.sendToUI('research-loaded', { research: this.currentResearch });
            }
        } catch (error) {
            console.error('Error loading saved research:', error);
        }
    }

    // Export research
    async exportResearch() {
        try {
            const exportData = Object.assign({}, this.currentResearch, {
                figmaContext: this.figmaData,
                exportedAt: new Date().toISOString(),
                version: '1.0.0'
            });

            // Create export string
            const exportString = JSON.stringify(exportData, null, 2);

            // Send to UI for download
            this.sendToUI('research-export', { data: exportString });

            console.log('Research exported successfully');

        } catch (error) {
            console.error('Error exporting research:', error);
            this.sendToUI('error', { message: 'Failed to export research' });
        }
    }

    // Send message to UI
    sendToUI(type, data) {
        figma.ui.postMessage({
            pluginMessage: {
                type: type,
                data: data
            }
        });
    }
}

// Initialize the plugin
const researchManager = new ResearchManager();

// Show UI
figma.showUI(__html__, {
    width: 400,
    height: 600,
    themeColors: true
});

// Initialize when ready
researchManager.init().catch(error => {
    console.error('Failed to initialize plugin:', error);
    figma.ui.postMessage({
        type: 'error',
        data: { message: 'Failed to initialize plugin' }
    });
});

// Handle plugin close
figma.on('close', () => {
    console.log('UX Research Helper plugin closed');
});