import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';

const Auth: NextPage = () => {
	return (
		<div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
			{/* <button
				type="button"
				onClick={() => signIn('github')}
				className="inline-flex w-max items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
			>
				Sign in with Github
			</button> */}
			<button
				type="button"
				onClick={() => signIn('google')}
				className="inline-flex w-max items-center px-5 py-2 border border-transparent text-base font-medium rounded-full border-gray-700 text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
			>
				Sign in with Google
			</button>
		</div>
	);
};

export default Auth;
