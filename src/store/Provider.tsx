import { ReactNode, useReducer } from 'react'
import { ActionTypes } from '../types/enums'
import { ContactsContext, initialState } from './Context'
import { ContactsReducer } from './Reducer'
import { Contact } from '../hooks/useContactsAPI'

interface ProviderProps {
	children: ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(ContactsReducer, initialState)

	const setLoadedValues = (contactList: Contact[]) =>
		dispatch({ type: ActionTypes.setLoadedValues, payload: contactList })

	const addContact = (contact: Contact) =>
		dispatch({ type: ActionTypes.addContact, payload: contact })

	const removeContact = (contactId: number) =>
		dispatch({ type: ActionTypes.removeContact, payload: contactId })

	const editContact = (contact: Contact) =>
		dispatch({ type: ActionTypes.editContact, payload: contact })

	return (
		<ContactsContext.Provider
			value={{
				state,
				setLoadedValues,
				addContact,
				removeContact,
				editContact
			}}>
			{children}
		</ContactsContext.Provider>
	)
}