import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import { useContactsAPI } from '../../hooks/useContactsAPI'
import { Contact } from '../Contact/ContactPage'
import './NewContactPage.css'

const NewContactPage: React.FC = () => {
	const { createContact } = useContactsAPI()
	const navigate = useNavigate()
	const [contactInfo, setContactInfo] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContactInfo(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	function handleSave() {
		const formattedContact: Contact = {
			id: -1,
			name: {
				first: contactInfo.firstName,
				last: contactInfo.lastName
			},
			phone: contactInfo.phone,
			email: contactInfo.email,
			favorite: false
		}
		const newContact = createContact(formattedContact)

		navigate(`/contatos/${newContact.id}`)
	}

	return (
		<div id="new-contact-page">
			<label htmlFor='first-name'>Nome</label>
			<Input
				id='first-name'
				name='firstName'
				placeholder='Primeiro nome'
				aria-label='first name'
				onChange={handleChange}
			/>
			<Input
				id='last-name'
				name='lastName'
				placeholder='Sobrenome'
				aria-label='last name'
				onChange={handleChange}
			/>

			<label htmlFor='email'>Email</label>
			<Input
				id='email'
				name='email'
				placeholder='email@exemplo.com.br'
				aria-label='email'
				onChange={handleChange}
			/>
			<label htmlFor='phone'>Telefone</label>
			<Input
				id='phone'
				name='phone'
				placeholder='(41) 99887-6655'
				aria-label='phone'
				onChange={handleChange}
			/>

			<span id='action-buttons'>

				<Button data-variant='secondary' onClick={() => handleSave()}>Salvar</Button>
				<Button data-variant='danger'>Cancelar</Button>
			</span>
		</div>
	)
}

export default NewContactPage