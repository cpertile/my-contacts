import Button from './components/Button/Button';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
		<>
			<Sidebar />
			<div id='content'>
				<h1>Gerenciador de Contatos</h1>
				Selecione uma opção para prosseguir:
				<Button data-variant='primary'>Lista populada</Button>
				<Button data-variant='secondary'>Lista vazia</Button>
			</div>
    </>
  )
}

export default App
