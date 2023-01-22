import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

import React from 'react';

export default function ErrorPage() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		console.log(error);
		return (
			<div id='error-page'>
				<h1>Oops! {error.status}</h1>
				<p>Sorry, an unexpected error has occurred.</p>

				<p>{error.statusText}</p>
				{error.data?.message && (
					<p>
						<i>{error.data.message}</i>
					</p>
				)}
			</div>
		);
	} else if (error instanceof Error) {
		console.error(error);
		return (
			<div id='error-page'>
				<h1>Oops! </h1>
				<p>Sorry, an unexpected error has occurred.</p>
				<p>
					<i>{error.message}</i>
				</p>
			</div>
		);
	} else {
		return (
			<>
				<div>
					<p>Sorry, an unexpected error has occurred.</p>
				</div>
			</>
		);
	}
}
