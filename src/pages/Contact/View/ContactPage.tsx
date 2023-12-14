import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact, INITIAL_CONTACT, useContactsAPI } from '../../../hooks/useContactsAPI';
import './ContactPage.css';
import Button from '../../../components/Button/Button';

const ContactPage: React.FC = () => {
	const [contact, setContact] = useState<Contact>(INITIAL_CONTACT)
	const { contactId } = useParams()
	const { findContactById, deleteContact } = useContactsAPI()
	const navigate = useNavigate()

	useEffect(() => {
		contactId && setContact(findContactById(parseInt(contactId)))
	}, [contactId, findContactById])

	function handleEdit() {
		navigate(`/contatos/${contact?.id}/editar`)
	}

	function handleDelete() {
		deleteContact(contact)
		navigate(`/`)
	}

	return (
		<div id='contact'>
			<div>
				<span id='contact-name-and-favorite'>
					<h1>{contact?.name.first} {contact?.name.last}</h1>
					<span>{contact?.favorite ? '★' : '☆'}</span>
				</span>
				{contact?.email && <p>{contact.email}</p>}
				{contact?.phone && <p>{contact.phone}</p>}
				<Button data-variant='secondary' onClick={handleEdit}>Editar</Button>
				<Button data-variant='delete' onClick={handleDelete}>Excluir</Button>
			</div>
		</div>
	)
}

export default ContactPage