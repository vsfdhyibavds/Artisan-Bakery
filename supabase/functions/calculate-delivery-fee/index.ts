const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface DeliveryCalculationData {
  address: string;
  city: string;
  zipCode: string;
  orderTotal: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { address, city, zipCode, orderTotal }: DeliveryCalculationData = await req.json();

    let deliveryFee = 779; // Base fee (KES)
    let estimatedTime = '30-45 minutes';
    let canDeliver = true;

    const zipCodeNum = parseInt(zipCode);
    if (zipCodeNum >= 10000 && zipCodeNum <= 10099) {
      deliveryFee = 779;
      estimatedTime = '30-45 minutes';
    } else if (zipCodeNum >= 10100 && zipCodeNum <= 10199) {
      deliveryFee = 1169;
      estimatedTime = '45-60 minutes';
    } else if (zipCodeNum >= 10200 && zipCodeNum <= 10299) {
      deliveryFee = 2079;
      estimatedTime = '60-90 minutes';
    } else {
      canDeliver = false;
      deliveryFee = 0;
      estimatedTime = 'Not available';
    }

    if (orderTotal >= 19500 && canDeliver) {
      deliveryFee = 0;
    }

    return new Response(
      JSON.stringify({
        canDeliver,
        deliveryFee,
        estimatedTime,
        freeDeliveryThreshold: 19500,
        message: canDeliver ? 'Delivery available' : 'Delivery not available to this area',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
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
