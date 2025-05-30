
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()

    const messages = [
      {
        role: 'system',
        content: `You are an expert math tutor AI assistant. Help students with:
- Solving math problems step-by-step
- Explaining mathematical concepts clearly
- Providing helpful hints and guidance
- Checking their work and providing feedback

Always:
- Show step-by-step solutions
- Explain the reasoning behind each step
- Use clear mathematical notation
- Be encouraging and educational
- Ask follow-up questions to check understanding

Format mathematical expressions clearly and provide detailed explanations.`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ]

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const data = await openAIResponse.json()
    const response = data.choices[0].message.content

    return new Response(
      JSON.stringify({ response }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
