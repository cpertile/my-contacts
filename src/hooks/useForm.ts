import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contact, useContactsAPI } from './useContactsAPI'

const INITIAL_FORM_DATA = {
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
	picture: '',
	favorite: false
}

export function useForm() {
	const [contactInfo, setContactInfo] = useState(INITIAL_FORM_DATA)
	const { saveContact } = useContactsAPI()
	const navigate = useNavigate()

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		e.preventDefault()

		if (e.target.name === 'phone') {
			let phone = e.target.value.replace(/\D/g, '')
			phone = phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
			e.target.value = phone
		}

		setContactInfo(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}

	function handleFavorite() {
		setContactInfo(prevState => ({
			...prevState,
			favorite: !prevState.favorite
		}))
	}

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		const formattedContact: Contact = {
			id: contactInfo.id,
			name: {
				first: contactInfo.firstName,
				last: contactInfo.lastName
			},
			phone: contactInfo.phone,
			email: contactInfo.email,
			favorite: contactInfo.favorite,
			picture: { medium: contactInfo.picture }
		}
		const result = saveContact(formattedContact)

		navigate(`/contatos/${result.id}`)
	}

	function handleCancel(e: FormEvent) {
		e.preventDefault()
		if (contactInfo.id === 0) {
			navigate('/')
		} else {
			navigate(`/contatos/${contactInfo.id}`)
		}
	}

	return {
		contactInfo,
		setContactInfo,
		handleChange,
		handleFavorite,
		handleSubmit,
		handleCancel
	}
}