import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: process.env.UPSTASH_URL as string,
	token: process.env.UPSTASH_TOKEN as string,
});

export const create = async (key: string) => {
	await redis.set(key, 0);
};

export const get = async (key: string) => {
	return (await redis.get(key)) as number | null;
};

export const set = async (key: string, value: number) => {
	await redis.set(key, value);
};
