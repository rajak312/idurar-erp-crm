const fetch = require('node-fetch');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function generate(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not set in environment variables');
  }

  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini API Error:', errorData);
    throw new Error(`Gemini API failed: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const summary = data.candidates?.[0]?.content?.parts?.[0]?.text;

  return summary || 'No summary was generated.';
}

module.exports = generate;
