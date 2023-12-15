// This hook will provide the application with an API to get, put, post and delete contacts
import { useCallback, useContext } from 'react'
import { ContactsContext } from '../store/Context'

const fakeNamesUrl = 'https://randomuser.me/api/?nat=br&inc=name,email,phone,picture&seed=iob&results=36'

export const INITIAL_CONTACT: Contact = {
	id: 0,
	name: { first: '', last: '' },
	email: '',
	phone: '',
	picture: { medium: '' },
	favorite: false
}

export type Contact = {
	id: number
	name: { first: string, last: string }
	email?: string
	phone?: string
	picture?: { medium: string }
	favorite: boolean
}

export function useContactsAPI() {
	const {
		state,
		setLoadedValues,
		addContact,
		editContact,
		removeContact
	} = useContext(ContactsContext)

	function cleanList() {
		setLoadedValues([])
	}

	const loadFakeNames = useCallback(async () => {
		const response = await fetch(fakeNamesUrl)
		const { results } = await response.json()

		for (let i = 0; i < results.length; i++) {
			results[i] = { ...results[i], id: i + 1, favorite: false }
		}

		setLoadedValues(results)
	}, [setLoadedValues])

	const findContactById = useCallback((id: number) => {
		const result = state.contacts.find(contact => contact.id === id)
		return result || INITIAL_CONTACT
	}, [state.contacts])

	function saveContact(contact: Contact) {
		if (contact.id === 0) {
			const newContact = { ...contact, id: state.contacts.length + 1 }
			addContact(newContact)
			return newContact
		}
		editContact(contact)
		return contact
	}

	function deleteContact(contact: Contact) {
		removeContact(contact.id)
	}

	return {
		state,
		loadFakeNames,
		cleanList,
		findContactById,
		saveContact,
		deleteContact
	}
}