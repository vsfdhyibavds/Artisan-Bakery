const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface PaymentData {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  paymentMethodId: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { amount, currency, orderId, customerEmail, paymentMethodId }: PaymentData = await req.json();

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

    if (stripeKey) {
      const Stripe = await import('npm:stripe@16.12.0');
      const stripe = new Stripe.default(stripeKey);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency || 'kes',
        payment_method: paymentMethodId,
        confirm: true,
        receipt_email: customerEmail,
        metadata: { orderId },
      });

      if (paymentIntent.status === 'succeeded') {
        return new Response(
          JSON.stringify({
            success: true,
            paymentIntent,
            message: 'Payment processed successfully',
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        );
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Payment status: ${paymentIntent.status}`,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        );
      }
    }

    // No Stripe secret key configured — return a clear error, not a random failure
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Payment processing is not configured. Set STRIPE_SECRET_KEY in edge function secrets.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 503,
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
