import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderConfirmationData {
  orderId: string
  customerEmail: string
  customerName: string
  orderItems: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  pickupDate: string
  pickupTime: string
  orderType: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId, customerEmail, customerName, orderItems, total, pickupDate, pickupTime, orderType }: OrderConfirmationData = await req.json()

    // Email content
    const emailContent = `
      <h2>Order Confirmation - Artisan Bakery</h2>
      <p>Dear ${customerName},</p>
      <p>Thank you for your order! Here are the details:</p>
      
      <h3>Order #${orderId}</h3>
      <ul>
        ${orderItems.map(item => `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
      </ul>
      
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
      <p><strong>${orderType === 'pickup' ? 'Pickup' : 'Delivery'} Date:</strong> ${pickupDate} at ${pickupTime}</p>
      
      <p>We'll have your order ready for you. Thank you for choosing Artisan Bakery!</p>
      
      <p>Best regards,<br>The Artisan Bakery Team</p>
    `

    // In a real implementation, you would use a service like SendGrid, Resend, or similar
    console.log('Sending email to:', customerEmail)
    console.log('Email content:', emailContent)

    return new Response(
      JSON.stringify({ success: true, message: 'Order confirmation sent' }),
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