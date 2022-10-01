import { get, create, updateSubscription } from '@/lib/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
	apiVersion: '2022-08-01',
});

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	let event = req.body;

	if (endpointSecret) {
		const signature = req.headers['stripe-signature'];
		try {
			event = stripe.webhooks.constructEvent(req.body, signature as string, endpointSecret);
		} catch (err: any) {
			console.log(`⚠️  Webhook signature verification failed.`, err.message);
			return res.status(400).json({ message: 'Webhook Error', err });
		}
	}

	switch (event.type) {
		case 'payment_intent.succeeded':
			const paymentIntent = event.data.object;

			const data = await get(paymentIntent.charges.data[0].billing_details.email);

			if (!data?.count) {
				await create(paymentIntent.charges.data[0].billing_details.email);
			}

			await updateSubscription(
				paymentIntent.customer,
				paymentIntent.charges.data[0].billing_details.email
			);
			break;
		default:
			return;
	}

	res.status(200);
}