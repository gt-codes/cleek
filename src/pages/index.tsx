import { trpc } from '@/lib/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const utils = trpc.useContext();
	const { data } = trpc.useQuery(['user.data']);
	const { mutate } = trpc.useMutation(['user.click'], {
		onSuccess: () => {
			utils.invalidateQueries(['user.data']);
		},
	});

	return (
		<div className="h-full w-full relative flex flex-col justify-center items-center">
			<p className="text-9xl absolute top-12 font-black">{data?.count}</p>
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
