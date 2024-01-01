import Stripe from "stripe"
import { headers } from 'next/headers'
import { buffer } from "stream/consumers";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { createSupabaseAdmin } from "../../../../lib/supabase";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.ENDPOINT_SECRET!;

export async function POST(request: any) {

    const rawBody = await buffer(request.body)

    let event: Stripe.Event;
    try {
        const sig = headers().get('stripe-signature');

        event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
    } catch (err: any) {
        return Response.json({ "error": "Webhook error" + err.message })
    }

    // Handle the event
    switch (event.type) {
        case 'customer.updated':
            const customer = event.data.object;
            // console.log("erf", paymentIntentSucceeded);

            const subscription = await stripe.subscriptions.list({
                customer: customer.id,
            });
            if (subscription.data.length) {
                const sub = subscription.data[0];
                // call supabase to updated user table
                const { error } = await onSuccessSubstription(sub.status === "active", sub.id, customer.id, customer.email!);

                if (error?.message) {
                    return Response.json({ "error": error.message })
                }

            }

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    return Response.json({})
}


const onSuccessSubstription = async (subscription_status: boolean, stripe_customer_id: string, stripe_subscription_id: string, email: string) => {
    const supabaseAdmin = await createSupabaseAdmin();
    return await supabaseAdmin.from("users").update({
        subscription_status,
        stripe_customer_id,
        stripe_subscription_id
    }).eq("email", email);


}