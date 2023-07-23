import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { Setting } from "@/models/Setting";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handle(req, res){
    if(req.method !== 'POST')
    {
        res.json('SHOULD BE A POST REQUEST!');
        return;
    }
    const {name, email, country, city, postalCode, 
        streetAdress, cartProducts} = req.body;
    await mongooseConnect();

    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds});

    let line_items = [];
    for(const productId of uniqueIds){
        const productInfo = productsInfos.find(product => product._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId).length || 0;
        if(quantity > 0 && productInfo)
        {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name: productInfo.title},
                    unit_amount: quantity * productInfo.price * 100,
                }
            });
        };
        
    };

    const session = await getServerSession(req,res,authOptions);


    const orderDocument = await Order.create({
        line_items, name, email, country, city, 
        postalCode, streetAdress, paid:false,
        userEmail: session?.user?.email,
    });

    const shippingFeeSetting = await Setting.findOne({name:'shippingFee'});
    const shippingFeeCents = parseInt(shippingFeeSetting?.value || '0') * 100;


    const stripeSession = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.NEXT_PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.NEXT_PUBLIC_URL + '/cart?canceled=1',
        metadata: {orderId: orderDocument._id.toString(), test: 'ok'},
        allow_promotion_codes: true,
        shipping_options: [
          {
            shipping_rate_data: {
              display_name: 'shipping fee',
              type: 'fixed_amount',
              fixed_amount: {amount: shippingFeeCents, currency: 'USD'},
            },
          }
        ],
    });

    // Update the order document to set paid as true after successful payment
    await Order.findByIdAndUpdate(orderDocument._id, { paid: true });

    res.json({
        url: stripeSession.url,

    })

}