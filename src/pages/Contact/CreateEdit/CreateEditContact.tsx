import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { useContactsAPI } from '../../../hooks/useContactsAPI'
import { useForm } from '../../../hooks/useForm'
import './CreateEditContact.css'

const CreateEditContactPage: React.FC = () => {
	const { findContactById } = useContactsAPI()
	const { contactId } = useParams()
	const navigate = useNavigate()
	const {
		contactInfo,
		setContactInfo,
		handleChange,
		handleFavorite,
		handleSubmit
	} = useForm()

	useEffect(() => {
		if (contactId) {
			const contact = findContactById(parseInt(contactId))
			setContactInfo({
				id: contact?.id || 0,
				firstName: contact?.name.first || '',
				lastName: contact?.name.last || '',
				email: contact?.email || '',
				phone: contact?.phone || '',
				favorite: contact?.favorite || false
			})
		}
	}, [contactId, contactInfo.id, findContactById, setContactInfo])

	return (
		<div id="edit-contact-page">
			<form onSubmit={handleSubmit}>
				<span id='name-fields'>
					<label htmlFor='first-name'>Nome</label>
					<Input
						required
						id='first-name'
						name='firstName'
						placeholder='Primeiro nome'
						aria-label='first name'
						defaultValue={contactInfo.firstName}
						onChange={handleChange}
					/>
					<Input
						required
						id='last-name'
						name='lastName'
						placeholder='Sobrenome'
						aria-label='last name'
						defaultValue={contactInfo.lastName}
						onChange={handleChange}
					/>
					<Button type='button' name='favorite' onClick={() => handleFavorite()}>
						{contactInfo.favorite ? "★" : "☆"}
					</Button>
				</span>

				<span id='email-field'>
					<label htmlFor='email'>Email</label>
					<Input
						id='email'
						name='email'
						type='email'
						placeholder='email@exemplo.com.br'
						aria-label='email'
						defaultValue={contactInfo.email}
						onChange={handleChange}
					/>
				</span>

				<span id="phone-field">
					<label htmlFor='phone'>Telefone</label>
					<Input
						id='phone'
						name='phone'
						placeholder='(41) 99887-6655'
						aria-label='phone'
						defaultValue={contactInfo.phone}
						maxLength={15}
						onChange={handleChange}
					/>
				</span>

				<span id='action-buttons'>
					<Button data-variant='secondary' type='submit'>Salvar</Button>
					<Button onClick={() => navigate(`/contatos/${contactId}`)}>Cancelar</Button>
				</span>
			</form>
		</div >
	)
}

export default CreateEditContactPage