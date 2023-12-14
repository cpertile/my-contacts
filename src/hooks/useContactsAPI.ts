// This hook will provide the application with an API to get, put, post and delete contacts
import { useCallback, useContext } from 'react'
import { ContactsContext } from '../store/Context'

const fakeNamesUrl = 'https://randomuser.me/api/?nat=br&inc=name,email,phone,picture&seed=iob&results=36'

export function useContactsAPI() {
	const { state, setLoadedValues } = useContext(ContactsContext)

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

	return {
		state,
		loadFakeNames,
		findById
	}
}