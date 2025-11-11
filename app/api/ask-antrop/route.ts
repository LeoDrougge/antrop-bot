import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import antropContent from '@/antrop-content.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { workplace, need } = await request.json();

    if (!workplace || !need) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = `Du är en AI-assistent för designbyrån Antrop. Din uppgift är att hjälpa potentiella kunder förstå hur Antrop kan hjälpa dem.

FÖRETAGSINFORMATION:
${JSON.stringify(antropContent.company, null, 2)}

TJÄNSTER:
${JSON.stringify(antropContent.services, null, 2)}

CASE:
${JSON.stringify(antropContent.cases, null, 2)}

INSTRUKTIONER:
1. Analysera användarens arbetsplats och behov
2. Skapa ett inspirerande, pedagogiskt svar med professionell ton
3. Strukturera svaret i följande format:
   - greeting: En hälsning i formatet ">Hej [Företagsnamn]! Så här kan vi hjälpa er [grammatiskt korrekt formulering av behovet]." Anpassa formuleringen så den blir grammatiskt korrekt oavsett hur användaren uttryckte sig. Exempel: ">Hej Spotify! Så här kan vi hjälpa er att bygga en app.", ">Hej Google! Så här kan vi hjälpa er med er kundresa."
   - understanding: Knyt an till kundens bransch och Antrops erfarenhet av den eller närliggande branscher. Visa branschförståelse och relevant kompetens. (2-3 meningar)
   - approach: Tre förslag på aktiviteter (t.ex. kvalitativ research). Varje aktivitet ska ha en kort rubrik (2-4 ord) och EXAKT EN beskrivande mening
   - caseExamples: 1-3 relevanta case från CASE-listan ovan. Välj fler case om flera är relevanta för kundens behov. (inkludera namn, kort beskrivning och URL från varje case)
   - nextSteps: 2-3 konkreta nästa steg. Varje steg ska ha en kort rubrik (2-4 ord) och EXAKT EN beskrivande mening
   - closing: Avslutande uppmuntran (1 mening)

4. Returnera ENDAST valid JSON i exakt detta format:
{
  "greeting": "string",
  "understanding": "string",
  "approach": [
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"}
  ],
  "caseExamples": [
    {
      "name": "string",
      "description": "string",
      "url": "string"
    }
  ],
  "nextSteps": [
    {"title": "string", "description": "string"},
    {"title": "string", "description": "string"}
  ],
  "closing": "string"
}`;

    const userMessage = `Vi på ${workplace} behöver hjälp med: ${need}.`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1200,
      temperature: 0.7,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const firstBlock = message.content[0];
    if (firstBlock.type !== 'text') {
      throw new Error('Expected text response from AI');
    }
    let responseText = firstBlock.text;

    // Remove markdown code blocks if present
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      responseText = jsonMatch[1];
    }

    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText.trim());
    } catch {
      console.error('Failed to parse Claude response as JSON:', responseText);
      throw new Error('Invalid response format from AI');
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate response',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
