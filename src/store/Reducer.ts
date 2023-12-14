import { ActionTypes } from '../types/enums';
import { InitialStateType, initialState } from './Context';

export interface DispatchAction {
	type: ActionTypes;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
}

export const ContactsReducer = (state = initialState, action: DispatchAction): InitialStateType => {
	switch (action.type) {
		case ActionTypes.setLoadedValues:
			return { ...state, contacts: action.payload }

		case ActionTypes.addContact:
			return { ...state, contacts: [...state.contacts, action.payload] }

		case ActionTypes.editContact:
			break;

		case ActionTypes.removeContact:
			break;

		default:
			throw new Error(`Invalid Action: ${action.type}`)
	}

	return state
}