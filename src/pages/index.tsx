import { trpc } from '@/lib/trpc';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
	const { query } = useRouter();
	const { data } = trpc.useQuery(['user.getUserById', { id: (query.id as string) || '1' }]);

	return (
		<div className="h-screen w-screen">
			<div>
				<h1 className="">{data?.user?.name}</h1>
				<p>{data?.user?.email}</p>
			</div>
		</div>
	);
};

export default Home;
