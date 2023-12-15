import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { Contact, INITIAL_CONTACT, useContactsAPI } from '../../../hooks/useContactsAPI';
import './ContactPage.css';

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
		<div id='contact' data-testid='contact-information'>
			<span id='contact-name-and-favorite'>
				<h1 data-testid='name-display'>{contact.name.first} {contact.name.last}</h1>
				<span>{contact.favorite ? '★' : '☆'}</span>
			</span>
			{contact.picture?.medium ?
				<img
					className='contact-picture'
					key={contact.picture.medium}
					src={contact.picture.medium}
				/>
				:
				<div className='contact-picture initials'>
					{`${contact.name.first[0]?.toUpperCase()}${contact.name.last[0]?.toUpperCase()}`}
				</div>
			}
			{contact.email && <p>{contact.email}</p>}
			{contact.phone && <p>{contact.phone}</p>}
			<span className='action-buttons'>
				<Button data-variant='secondary' onClick={handleEdit}>Editar</Button>
				<Button data-variant='delete' onClick={handleDelete}>Excluir</Button>
			</span>
		</div>
	)
}

export default ContactPage