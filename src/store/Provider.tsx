import { ReactNode, useReducer } from 'react'
import { Contact } from '../pages/Contact/ContactPage'
import { ContactsContext, initialState } from './Context'
import { ActionTypes, ContactsReducer } from './Reducer'

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