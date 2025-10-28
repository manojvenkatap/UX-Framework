// Netlify Server Function - Claude API Proxy
// This runs server-side, keeping your API key secure

exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse request body
        const requestData = JSON.parse(event.body);

        // Validate request
        if (!requestData.messages || !Array.isArray(requestData.messages)) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Invalid request format' })
            };
        }

        // Get API key from environment (secure server-side storage)
        const apiKey = process.env.CURSOR_API_KEY;

        if (!apiKey) {
            console.error('CURSOR_API_KEY not found in environment variables');
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: 'Server configuration error' })
            };
        }

        // Prepare Cursor API request
        const cursorRequest = {
            messages: requestData.messages,
            model: 'gpt-4',
            max_tokens: 1000
        };

        // Call Cursor API (server-side only - API key never exposed to client)
        const response = await fetch('https://api.cursor.sh/v1/ai/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cursorRequest)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Cursor API error:', response.status, errorText);

            return {
                statusCode: response.status,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    error: 'Cursor API error',
                    details: response.status === 401 ? 'Invalid API key' : 'API request failed'
                })
            };
        }

        const cursorResponse = await response.json();

        // Return Cursor response to Figma plugin
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                data: cursorResponse
            })
        };

    } catch (error) {
        console.error('Server error:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};
