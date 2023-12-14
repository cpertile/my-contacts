import { ActionTypes } from '../types/enums';
import { InitialStateType, initialState } from './Context';

export interface DispatchAction {
	type: ActionTypes;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
}

export const ContactsReducer = (state = initialState, action: DispatchAction): InitialStateType => {
	const newState = { ...state }
	let elementIndex
	let newContactList
	switch (action.type) {
		case ActionTypes.setLoadedValues:
			return { ...newState, contacts: action.payload }

		case ActionTypes.addContact:
			return { ...newState, contacts: [action.payload, ...newState.contacts] }

		case ActionTypes.editContact:
			elementIndex = newState.contacts.findIndex(ct => ct.id === action.payload.id)
			newContactList = [...newState.contacts]
			newContactList[elementIndex] = action.payload
			return { ...newState, contacts: newContactList }

		case ActionTypes.removeContact:
			newContactList = newState.contacts.filter(ct => ct.id !== action.payload)
			return { ...newState, contacts: newContactList }

		default:
			throw new Error(`Invalid Action: ${action.type}`)
	}
}