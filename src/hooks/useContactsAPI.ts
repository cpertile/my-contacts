// This hook will provide the application with an API to get, put, post and delete contacts
import { useCallback, useContext } from 'react'
import { ContactsContext } from '../store/Context'
import { Contact } from '../pages/Contact/ContactPage'

const fakeNamesUrl = 'https://randomuser.me/api/?nat=br&inc=name,email,phone,picture&seed=iob&results=36'

export function useContactsAPI() {
	const { state, setLoadedValues, addContact } = useContext(ContactsContext)

	function cleanList() {
		setLoadedValues([])
	}

	const loadFakeNames = useCallback(async () => {
		const response = await fetch(fakeNamesUrl)
		const { results } = await response.json()

		for (let i = 0; i < results.length; i++) {
			results[i] = { ...results[i], id: i + 1 }
		}

		setLoadedValues(results)
	}, [setLoadedValues])

	function findById(id: number) {
		return state.contacts.find(contact => contact.id === id)
	}

	function createContact(contact: Contact) {
		const newContact = { ...contact, id: state.contacts.length + 1 }
		addContact(newContact)
		return newContact
	}

	return {
		state,
		loadFakeNames,
		cleanList,
		findById,
		createContact
	}
}