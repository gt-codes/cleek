import { trpc } from '@/lib/trpc';
import Pro from './pro';

export default function Header() {
	const { data, isLoading } = trpc.useQuery(['user.data']);

	return (
		<div className="flex py-8 shadow w-full h-max justify-center">
			<h1 className="font-bold text-3xl italic text-purple-600">
				Cleek {data?.stripeId && <Pro />}
			</h1>
		</div>
	);
}
