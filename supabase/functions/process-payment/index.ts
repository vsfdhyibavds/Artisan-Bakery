import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentData {
  amount: number
  currency: string
  orderId: string
  customerEmail: string
  paymentMethodId: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency, orderId, customerEmail, paymentMethodId }: PaymentData = await req.json()

    // In a real implementation, you would integrate with Stripe or another payment processor
    // This is a mock implementation for demonstration
    
    const mockPaymentResult = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      status: 'succeeded',
      amount: amount * 100, // Stripe uses cents
      currency: currency,
      customer: customerEmail,
      metadata: {
        orderId: orderId
      }
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock success (in real implementation, this would depend on actual payment result)
    const success = Math.random() > 0.1 // 90% success rate for demo

    if (success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          paymentIntent: mockPaymentResult,
          message: 'Payment processed successfully' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Payment failed - insufficient funds' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }
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