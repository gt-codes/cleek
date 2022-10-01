import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<{}>) {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-start">
			{children}
		</div>
	);
}
