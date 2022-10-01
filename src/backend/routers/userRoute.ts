import { createRouter } from '@/backend/utils/createRouter';
import { create, get, set } from '@/lib/redis';
import { TRPCError } from '@trpc/server';

export const userRoute = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
		return next();
	})
	.mutation('click', {
		async resolve({ ctx }) {
			const email = ctx.session?.user?.email as string;
			const clicks = await get(email);

			if (!clicks) {
				await create(email);
				await set(email, 1);
			} else {
				await set(email, clicks + 1);
			}
			return { success: true };
		},
	});
