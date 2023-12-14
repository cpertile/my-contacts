import { InitialStateType, initialState } from './Context';

export enum ActionTypes {
	setLoadedValues = 'load',
	addContact = 'add',
	removeContact = 'remove',
	editContact = 'edit'
}

export interface DispatchAction {
	type: ActionTypes;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
}

export const ContactsReducer = (state = initialState, action: DispatchAction): InitialStateType => {
	switch (action.type) {
		case ActionTypes.setLoadedValues:
			console.log('ActionTypes.setLoadedValues :>> ', action.payload);
			return { ...state, contacts: action.payload }

		case ActionTypes.addContact:
			// return { ...state.contacts = [action.payload, ...state.contacts] }
			break;

		case ActionTypes.editContact:
			break;

		case ActionTypes.removeContact:
			break;

		default:
			throw new Error(`Invalid Action: ${action.type}`)
	}

	return state
}