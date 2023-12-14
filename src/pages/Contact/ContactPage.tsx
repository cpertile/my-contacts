import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContactsAPI } from '../../hooks/useContactsAPI';
import './ContactPage.css';

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

	useEffect(() => {
		contactId && setContact(findById(parseInt(contactId)))
	}, [contactId, findById])

	return (
		<div id='contact'>
			<div>
				<h1>{contact?.name.first} {contact?.name.last}</h1>
				{contact?.email && <p>{contact.email}</p>}
			</div>
		</div>
	)
}

export default ContactPage