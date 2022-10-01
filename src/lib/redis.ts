import { Redis } from '@upstash/redis';

type Data = {
	stripeId: string;
	count: number;
};

const redis = new Redis({
	url: process.env.UPSTASH_URL as string,
	token: process.env.UPSTASH_TOKEN as string,
});

export const create = async (key: string) => {
	await redis.hset(key, { stripeId: '', count: 1 });
};

export const get = async (key: string) => {
	return (await redis.hgetall(key)) as Data | null;
};

export const updateCount = async (key: string) => {
	await redis.hincrby(key, 'count', 1);
};
