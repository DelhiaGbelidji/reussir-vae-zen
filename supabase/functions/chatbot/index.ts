import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `Tu es un assistant spécialisé dans la Validation des Acquis de l'Expérience (VAE) pour la plateforme "réussirmavae". 

Voici tes principales responsabilités :
- Expliquer le processus VAE et ses étapes
- Aider les utilisateurs à comprendre les formations disponibles
- Répondre aux questions sur l'administration et les démarches
- Fournir des conseils pratiques pour réussir sa VAE
- Orienter vers les bonnes ressources et formations

Les formations disponibles incluent :
- BTS Management Commercial Opérationnel (Commerce, 24 mois)
- Licence Pro Ressources Humaines (RH, 12 mois) 
- CAP Petite Enfance (Petite Enfance, 18 mois)
- Titre Pro Développeur Web (Informatique, 15 mois)
- BTS Gestion de la PME (Gestion, 24 mois)
- BPJEPS Animation Sociale (Animation, 18 mois)

Réponds de manière bienveillante, professionnelle et en français. Sois concis mais informatif.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: botResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});