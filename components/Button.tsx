import React from 'react';

interface IButtonProps {
	canClick: boolean;
	loading: boolean;
	actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
	canClick,
	loading,
	actionText,
}) => (
	<button
		className={`btn border-none w-full ${
			canClick ? 'btn-primary' : 'bg-gray-300 pointer-events-none'
		}`}
	>
		{loading ? 'Loading...' : actionText}
	</button>
);
