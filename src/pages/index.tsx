import { trpc } from '@/lib/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const utils = trpc.useContext();
	const { data, isLoading } = trpc.useQuery(['user.data']);
	const { mutate } = trpc.useMutation(['user.click'], {
		onSuccess: () => {
			utils.invalidateQueries(['user.data']);
		},
	});

	const disabled = !isLoading && !data?.stripeId && data?.count === 3;

	const handleClick = () => {
		!disabled && mutate();
	};

	return (
		<div className="h-full w-full relative flex flex-col justify-center items-center">
			<p className="text-9xl absolute top-12 font-black">{data?.count || 0}</p>
			<button
				type="button"
				disabled={disabled}
				onClick={handleClick}
				className="inline-flex transition-all w-max items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm disabled:text-gray-600 disabled:bg-gray-200  text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Cleek Me
			</button>
		</div>
	);
};

export default Home;
