import { createRouter } from '@/backend/utils/createRouter';
import { TRPCError } from '@trpc/server';

export const userRoute = createRouter()
	.middleware(async ({ ctx, next }) => {
		if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
		return next();
	})
	.mutation('click', {
		async resolve({ input, ctx }) {},
	});
