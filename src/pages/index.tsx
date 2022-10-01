import { trpc } from '@/lib/trpc';
import type { NextPage } from 'next';

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

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
			<p
				className={classNames(
					disabled ? 'mt-3 opacity-100' : 'mt-0 opacity-0',
					'transition-all text-gray-600 mt-3'
				)}
			>
				<a
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center transition-all rounded-md hover:bg-pink-100 hover:px-2.5 py-0.5 text-sm font-medium text-pink-800"
					href="https://buy.stripe.com/test_9AQaIm9fJasJfYcdQQ"
				>
					Upgrade to Pro
				</a>{' '}
				for unlimited cleeks.
			</p>
		</div>
	);
};

export default Home;
