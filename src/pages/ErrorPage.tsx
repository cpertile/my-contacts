import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1>Houve um problema.</h1>
			<p>Algo que não esperávamos aconteceu.</p>
			<p>
				<i>{JSON.stringify(error)}</i>
			</p>
		</div>
	)
}