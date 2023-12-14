import { NavLink, useNavigate } from 'react-router-dom'
import { useContactsAPI } from '../../hooks/useContactsAPI'
import Button from '../Button/Button'
import './Sidebar.css'

const Sidebar: React.FC = () => {
	const { state } = useContactsAPI()
	const navigate = useNavigate()

	return (
		<div id='sidebar'>
			<span>
				<h1>Meus Contatos</h1>
				<Button data-variant='primary' onClick={() => navigate('/contatos/novo')}>Novo</Button>
			</span>
			<nav>
				{state.contacts.length > 0 ?
					<ul>
						{state.contacts.map(contact => (
							<li key={contact.phone}>
								<NavLink to={`contatos/${contact.id}`}>
									{contact.name.first} {contact.name.last}
									{contact.favorite && <span>★</span>}
								</NavLink>
							</li>
						))}
					</ul>
					: <p><i>Sem contatos</i></p>}
			</nav>
		</div>
	)
}

export default Sidebar