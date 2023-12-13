import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1>Houve um problema.</h1>
			<p>Aconteceu algo que não esperávamos.</p>
			<p>
				<i>{JSON.stringify(error)}</i>
			</p>
		</div>
	)
}