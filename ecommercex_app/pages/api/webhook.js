import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import {buffer} from 'micro'

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_8bc82e17263ccb7bb269a93aaa6415ca6387b5cc3b8bbb022fd10ae53a296c93";

export default async function handler(req, res){
    await mongooseConnect();

    const sig = req.headers['stripe-signature'];

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === 'paid'
        if(orderId && paid)
        {
          await Order.findByIdAndUpdate(orderId, {
            paid: true,
          })
        }
        // Then define and call a function to handle the event payment_intent.succeeded
        //console.log(paymentIntentSucceeded);
        break;
      // ... handle other event types
      default:
        //console.log(`Unhandled event type ${event.type}`);
    }
  
   res.status(200).send('ok');
}

export const config = {
    api: {bodyParse: false,}
}

// key:
// cohere-quiet-safely-pardon