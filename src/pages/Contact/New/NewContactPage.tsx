import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { useContactsAPI } from '../../../hooks/useContactsAPI'
import { Contact } from '../ContactPage'
import './NewContactPage.css'

const NewContactPage: React.FC = () => {
	const { createContact } = useContactsAPI()
	const navigate = useNavigate()
	const [contactInfo, setContactInfo] = useState({
		id: -1,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		favorite: null
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setContactInfo(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	function handleSubmit(e: FormEvent) {
		e.stopPropagation()
		const formattedContact: Contact = {
			id: 0,
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
			<form onSubmit={handleSubmit}>
				<label htmlFor='first-name'>Nome</label>
				<Input
					required
					id='first-name'
					name='firstName'
					placeholder='Primeiro nome'
					aria-label='first name'
					onChange={handleChange}
				/>
				<Input
					required
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

					<Button data-variant='secondary' type='submit'>Salvar</Button>
					<Button data-variant='danger' onClick={() => navigate('/')}>Cancelar</Button>
				</span>
			</form>
		</div>
	)
}

export default NewContactPage