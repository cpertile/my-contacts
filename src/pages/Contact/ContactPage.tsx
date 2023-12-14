import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContactsAPI } from '../../hooks/useContactsAPI';
import './ContactPage.css';
import Button from '../../components/Button/Button';

export type Contact = {
	id: number
	name: { first: string, last: string }
	email?: string
	phone?: string
	picture?: string
	favorite: boolean
}

const ContactPage: React.FC = () => {
	const [contact, setContact] = useState<Contact>()
	const { contactId } = useParams()
	const { findById } = useContactsAPI()
	const navigate = useNavigate()

	useEffect(() => {
		contactId && setContact(findById(parseInt(contactId)))
	}, [contactId, findById])

	return (
		<div id='contact'>
			<div>
				<span id='contact-name-and-favorite'>
					<h1>{contact?.name.first} {contact?.name.last}</h1>
					<span>{contact?.favorite ? '★' : '☆'}</span>
				</span>
				{contact?.email && <p>{contact.email}</p>}
				{contact?.phone && <p>{contact.phone}</p>}
				<Button data-variant='secondary' onClick={() => navigate(`/contatos/${contact?.id}/editar`)}>Editar</Button>
				<Button data-variant='delete'>Excluir</Button>
			</div>
		</div>
	)
}

export default ContactPage