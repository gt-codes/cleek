import { trpc } from '@/lib/trpc';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
	const { query } = useRouter();
	const { mutate } = trpc.useMutation(['user.click']);

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<button
				type="button"
				onClick={() => mutate()}
				className="inline-flex w-max items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Cleek Me
			</button>
		</div>
	);
};

export default Home;
