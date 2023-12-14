import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contact } from '../pages/Contact/View/ContactPage'
import { useContactsAPI } from './useContactsAPI'

export function useForm() {
	const { saveContact } = useContactsAPI()
	const navigate = useNavigate()
	const [contactInfo, setContactInfo] = useState({
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		favorite: false
	})

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
			favorite: contactInfo.favorite
		}
		const result = saveContact(formattedContact)

		navigate(`/contatos/${result.id}`)
	}

	return {
		contactInfo,
		setContactInfo,
		handleChange,
		handleFavorite,
		handleSubmit
	}
}