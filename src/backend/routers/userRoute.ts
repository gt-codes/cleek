import { createRouter } from '@/backend/utils/createRouter';
import { clear, create, get, updateCount } from '@/lib/redis';
import { TRPCError } from '@trpc/server';

export const userRoute = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
		return next();
	})
	.mutation('clear', {
		async resolve({ ctx }) {
			const email = ctx.session?.user?.email as string;
			await clear(email);
			return { success: true };
		},
	})
	.mutation('click', {
		async resolve({ ctx }) {
			const email = ctx.session?.user?.email as string;
			const clicks = await get(email);

			if (!clicks) await create(email);
			else await updateCount(email);

			return { success: true };
		},
	})
	.query('data', {
		async resolve({ ctx }) {
			const email = ctx.session?.user?.email as string;
			const data = await get(email);
			return data;
		},
	});
