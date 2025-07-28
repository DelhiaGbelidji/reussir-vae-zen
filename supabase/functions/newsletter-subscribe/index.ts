import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const mailerLiteApiKey = Deno.env.get('MAILERLITE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!mailerLiteApiKey || !supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // First, add to MailerLite
    const mailerLiteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mailerLiteApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        status: 'active',
        resubscribe: false,
      }),
    });

    const mailerLiteData = await mailerLiteResponse.json();

    if (!mailerLiteResponse.ok) {
      console.error('MailerLite API error:', mailerLiteData);
      // If email already exists in MailerLite, it's not necessarily an error for us
      if (mailerLiteData.message && mailerLiteData.message.includes('already exists')) {
        console.log('Email already exists in MailerLite, continuing...');
      } else {
        return new Response(
          JSON.stringify({ error: 'Failed to subscribe to newsletter service' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // Then, save to our database
    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email: email.toLowerCase().trim() }]);

    if (dbError) {
      console.error('Database error:', dbError);
      // If it's a unique constraint violation, that's OK
      if (dbError.code !== '23505') {
        return new Response(
          JSON.stringify({ error: 'Failed to save subscription' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    console.log('Successfully subscribed:', email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        mailerlite_id: mailerLiteData.data?.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in newsletter-subscribe function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);