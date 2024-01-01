"use server"

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function checkOut(email: string, redirectTo: string) {

    return JSON.stringify(await stripe.checkout.sessions.create({
        success_url: redirectTo || process.env.SITE_URL,
        cancel_url: process.env.SITE_URL,
        customer_email: email,
        line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
        mode: "subscription"
    }));

}