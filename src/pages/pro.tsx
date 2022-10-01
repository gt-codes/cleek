import Pro from '@/components/pro';
import Link from 'next/link';

export default function ProPage() {
	return (
		<div className="h-full w-full relative space-y-8 flex flex-col px-6 justify-center items-center">
			<h1 className="text-7xl font-bold">Yay 🥳</h1>
			<p className="text-gray-500 font-medium text-center">
				Welcome to <Pro /> Your unlimited clicks are now active.
			</p>
			<Link href="/">
				<a className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
					Start Cleeking
				</a>
			</Link>
		</div>
	);
}
