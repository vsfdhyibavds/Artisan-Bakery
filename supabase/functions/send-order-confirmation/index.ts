const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface OrderConfirmationData {
  orderId: string;
  customerEmail: string;
  customerName: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  pickupDate: string;
  pickupTime: string;
  orderType: string;
}

function formatKes(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { orderId, customerEmail, customerName, orderItems, total, pickupDate, pickupTime, orderType }: OrderConfirmationData = await req.json();

    const emailContent = `
      <h2>Order Confirmation - Artisan Bakery</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your order! Here are the details:</p>

      <h3>Order #${orderId}</h3>
      <ul>
        ${orderItems.map(item => `<li>${item.quantity}x ${item.name} - ${formatKes(item.price)}</li>`).join('')}
      </ul>

      <p><strong>Total: ${formatKes(total)}</strong></p>
      <p><strong>${orderType === 'pickup' ? 'Pickup' : 'Delivery'} Date:</strong> ${pickupDate} at ${pickupTime}</p>

      <p>We'll have your order ready for you. Thank you for choosing Artisan Bakery!</p>

      <p>Best regards,<br>The Artisan Bakery Team</p>
    `;

    console.log('Sending email to:', customerEmail);
    console.log('Email content:', emailContent);

    return new Response(
      JSON.stringify({ success: true, message: 'Order confirmation sent' }),
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
