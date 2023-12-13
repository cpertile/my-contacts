import Button from '../Button/Button'
import './Sidebar.css'

const Sidebar: React.FC = () => {
	return (
		<div id='sidebar'>
			<span>
				<h1>Meus Contatos</h1>
				<Button data-variant='primary'>Novo</Button>
			</span>
			<nav>
				<ul>
					
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar