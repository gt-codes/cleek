import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AppRouter } from '@/backend/routers';
import { withTRPC } from '@trpc/next';
import Layout from '@/components/layout';
import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

function getBaseUrl() {
	if (process.browser) return ''; // Browser should use current path
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

function MyApp({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Header />
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

export default withTRPC<AppRouter>({
	config({ ctx }) {
		/**
		 * If you want to use SSR, you need to use the server's full URL
		 * @link https://trpc.io/docs/ssr
		 */
		const url = `${getBaseUrl()}/api/trpc`;

		return {
			url,
			/**
			 * @link https://react-query.tanstack.com/reference/QueryClient
			 */
			// queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		};
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 */
	ssr: false,
})(MyApp);
