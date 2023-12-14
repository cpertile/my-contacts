// This hook will provide the application with an API to get, put, post and delete contacts
import { useCallback, useContext } from 'react'
import { Contact } from '../pages/Contact/View/ContactPage'
import { ContactsContext } from '../store/Context'

const fakeNamesUrl = 'https://randomuser.me/api/?nat=br&inc=name,email,phone,picture&seed=iob&results=36'

export function useContactsAPI() {
	const { state, setLoadedValues, addContact, editContact } = useContext(ContactsContext)

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
		return state.contacts.find(contact => contact.id === id)
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

	return {
		state,
		loadFakeNames,
		cleanList,
		findContactById,
		saveContact
	}
}