import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import { useContactsAPI } from '../../../hooks/useContactsAPI'
import { useForm } from '../../../hooks/useForm'
import './CreateEditContact.css'

const CreateEditContactPage: React.FC = () => {
	const { findContactById } = useContactsAPI()
	const { contactId } = useParams()
	const {
		contactInfo,
		setContactInfo,
		handleChange,
		handleFavorite,
		handleSubmit,
		handleCancel
	} = useForm()

	useEffect(() => {
		if (contactId) {
			const contact = findContactById(parseInt(contactId))
			setContactInfo({
				id: contact.id,
				firstName: contact.name.first,
				lastName: contact.name.last,
				email: contact.email || '',
				phone: contact.phone || '',
				picture: contact.picture?.medium || '',
				favorite: contact.favorite
			})
		}
	}, [contactId, contactInfo.id, findContactById, setContactInfo])

	return (
		<div id="edit-contact-page">
			<form onSubmit={handleSubmit} className='form'>

				<label htmlFor='first-name'>Nome</label>
				<Input
					required
					id='first-name'
					name='firstName'
					placeholder='Primeiro nome'
					aria-label='first name'
					value={contactInfo.firstName}
					onChange={handleChange}
				/>
				<Input
					required
					id='last-name'
					name='lastName'
					placeholder='Sobrenome'
					aria-label='last name'
					value={contactInfo.lastName}
					onChange={handleChange}
				/>
				<Button type='button' name='favorite' onClick={() => handleFavorite()}>
					{contactInfo.favorite ? "★" : "☆"}
				</Button>

				<label htmlFor='email'>Email</label>
				<Input
					id='email'
					name='email'
					type='email'
					placeholder='email@exemplo.com.br'
					aria-label='email'
					value={contactInfo.email}
					onChange={handleChange}
				/>

				<label htmlFor='phone'>Telefone</label>
				<Input
					id='phone'
					name='phone'
					placeholder='(41) 99887-6655'
					aria-label='phone'
					value={contactInfo.phone}
					maxLength={15}
					onChange={handleChange}
				/>

				<label htmlFor='picture'>Foto (URL)</label>
				<Input
					id='picture'
					name='picture'
					placeholder='http://perfil.com/foto.png'
					aria-label='profile picture'
					value={contactInfo.picture}
					onChange={handleChange}
				/>

				<span className='action-buttons'>
					<Button data-variant='secondary' type='submit'>Salvar</Button>
					<Button onClick={handleCancel}>Cancelar</Button>
				</span>
			</form>
		</div >
	)
}

export default CreateEditContactPage