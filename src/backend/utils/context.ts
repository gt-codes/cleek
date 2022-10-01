import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { unstable_getServerSession } from 'next-auth/next';
import type { NextApiResponse } from 'next';
import { authConfig } from '@/pages/api/auth/[...nextauth]';

type SSRContextOptions = {
	req: IncomingMessage & { cookies: NextApiRequestCookies };
	res?: ServerResponse | NextApiResponse;
};

export const createContext = async (
	opts?: trpcNext.CreateNextContextOptions | SSRContextOptions
) => {
	try {
		const session = await unstable_getServerSession(
			opts?.req as IncomingMessage & { cookies: NextApiRequestCookies },
			opts?.res as ServerResponse,
			authConfig
		);
		return { session };
	} catch (error) {
		return {};
	}
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
