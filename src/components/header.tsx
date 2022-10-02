import { trpc } from '@/lib/trpc';
import { signOut, useSession } from 'next-auth/react';
import Pro from './pro';

export default function Header() {
	const { data: session } = useSession();
	const utils = trpc.useContext();
	const { data } = trpc.useQuery(['user.data']);
	const { mutate } = trpc.useMutation(['user.clear'], {
		onSuccess: () => {
			utils.invalidateQueries(['user.data']);
		},
	});

	return (
		<div className="flex relative py-8 shadow w-full h-max items-center justify-center">
			{session && (
				<span className="absolute left-6 isolate inline-flex rounded-md shadow-sm">
					<button
						type="button"
						onClick={() => signOut({ callbackUrl: '/auth' })}
						className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					>
						Logout
					</button>
					<button
						type="button"
						onClick={() => mutate()}
						disabled={Boolean(!data)}
						className="disabled:bg-gray-200 transition-all disabled:text-gray-600 relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
					>
						Clear Data
					</button>
				</span>
			)}
			<h1 className="font-bold text-3xl italic text-purple-600">
				Cleek {data?.stripeId && <Pro />}
			</h1>
		</div>
	);
}
