import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DeliveryCalculationData {
  address: string
  city: string
  zipCode: string
  orderTotal: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address, city, zipCode, orderTotal }: DeliveryCalculationData = await req.json()

    // Mock delivery fee calculation based on distance/zone
    // In a real implementation, you would use Google Maps API or similar

    let deliveryFee = 779 // Base fee (KES)
    let estimatedTime = '30-45 minutes'
    let canDeliver = true

    // Mock zone-based pricing (in KES)
    const zipCodeNum = parseInt(zipCode)
    if (zipCodeNum >= 10000 && zipCodeNum <= 10099) {
      deliveryFee = 779 // Local zone
      estimatedTime = '30-45 minutes'
    } else if (zipCodeNum >= 10100 && zipCodeNum <= 10199) {
      deliveryFee = 1169 // Extended zone
      estimatedTime = '45-60 minutes'
    } else if (zipCodeNum >= 10200 && zipCodeNum <= 10299) {
      deliveryFee = 2079 // Regional zone
      estimatedTime = '60-90 minutes'
    } else {
      canDeliver = false
      deliveryFee = 0
      estimatedTime = 'Not available'
    }

    // Free delivery for orders over 19500 KES (150 USD)
    if (orderTotal >= 19500 && canDeliver) {
      deliveryFee = 0
    }

    return new Response(
      JSON.stringify({
        canDeliver,
        deliveryFee,
        estimatedTime,
        freeDeliveryThreshold: 19500,
        message: canDeliver ? 'Delivery available' : 'Delivery not available to this area'
      }),
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