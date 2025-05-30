
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
    const { topic, difficulty, count = 5 } = await req.json()

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a math tutor creating practice questions. Generate ${count} math questions for the topic "${topic}" at difficulty level ${difficulty} (1=beginner, 2=intermediate, 3=advanced). 

Return a JSON array where each object has:
- question: the math problem as a string
- correct_answer: the correct answer as a string
- explanation: step-by-step solution explanation
- hints: array of 2-3 helpful hints

Make questions progressively challenging and educational. Use clear mathematical notation.`
          },
          {
            role: 'user',
            content: `Generate ${count} ${topic} questions at difficulty level ${difficulty}`
          }
        ],
        temperature: 0.7,
      }),
    })

    const data = await openAIResponse.json()
    const questionsText = data.choices[0].message.content

    // Parse the JSON response from OpenAI
    let questions
    try {
      questions = JSON.parse(questionsText)
    } catch (parseError) {
      // If JSON parsing fails, create a fallback structure
      console.error("JSON parse error:", parseError)
      questions = [{
        question: "Sample question parsing failed",
        correct_answer: "N/A",
        explanation: "There was an error generating questions",
        hints: ["Please try again"]
      }]
    }

    return new Response(
      JSON.stringify({ questions }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
