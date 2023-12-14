import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from './components/Button/Button';
import Sidebar from './components/Sidebar/Sidebar';
import { useContactsAPI } from './hooks/useContactsAPI';

function App() {
	const { loadFakeNames } = useContactsAPI()
	const [isReady, setIsReady] = useState(false)

	function handleChoice(choice: 'populated' | 'empty') {
		if (choice === 'populated') {
			loadFakeNames()
		}
		setIsReady(true)
	}

	return (
		<>
			<Sidebar />
			<div id='content'>
				{!isReady ?
					<>
						<h1>Gerenciador de Contatos</h1>
						Selecione uma opção para prosseguir:
						<Button
							data-variant='primary'
							onClick={() => handleChoice('populated')}
						>
							Lista populada
						</Button>
						<Button
							data-variant='secondary'
							onClick={() => handleChoice('empty')}
						>
							Lista vazia
						</Button>
					</>
					: <Outlet />}
			</div>
		</>
	)
}

export default App
