import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import { useContactsAPI } from './hooks/useContactsAPI';
import WelcomePage from './pages/Welcome/WelcomePage';
import { Choices } from './types/enums';

function App() {
	const [isReady, setIsReady] = useState(false)
	const { loadFakeNames } = useContactsAPI()
	const navigate = useNavigate()

	async function handleChoice(choice: Choices) {
		if (choice === Choices.populated) {
			await loadFakeNames()
		}
		setIsReady(true)
	}

	useEffect(() => {
		// Reseta a URL quando o app é atualizado
		return () => navigate('/')
	}, [navigate])

	return (
		<>
			{!isReady ?
				<WelcomePage handleChoice={handleChoice} />
				: <>
					<Sidebar />
					<main id='content'>
						<Outlet />
					</main>
				</>
			}
		</>
	)
}

export default App
