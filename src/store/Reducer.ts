import { ActionTypes } from '../types/enums';
import { InitialStateType, initialState } from './Context';

export interface DispatchAction {
	type: ActionTypes;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
}

export const ContactsReducer = (state = initialState, action: DispatchAction): InitialStateType => {
	let elementIndex
	let updatedState
	switch (action.type) {
		case ActionTypes.setLoadedValues:
			return { ...state, contacts: action.payload }

		case ActionTypes.addContact:
			return { ...state, contacts: [action.payload, ...state.contacts] }

		case ActionTypes.editContact:
			elementIndex = state.contacts.findIndex(ct => ct.id === action.payload.id)
			updatedState = [...state.contacts]
			updatedState[elementIndex] = action.payload
			return { ...state, contacts: updatedState }

		case ActionTypes.removeContact:
			break;

		default:
			throw new Error(`Invalid Action: ${action.type}`)
	}

	return state
}