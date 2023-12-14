/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { Contact } from '../pages/Contact/ContactPage';

export const initialState = {
	contacts: [] as Contact[]
}

type ContactsContextType = {
	state: InitialStateType,
	setLoadedValues: (contacts: Contact[]) => void,
	addContact: (contact: Contact) => void,
	removeContact: (contactId: number) => void,
	editContact: (contact: Contact) => void
}

export type InitialStateType = typeof initialState

export const ContactsContext = createContext<ContactsContextType>({
	state: initialState,
	setLoadedValues: (_contactList) => { },
	addContact: (_contact) => { },
	removeContact: (_contactId) => { },
	editContact: (_contact) => { }
})
