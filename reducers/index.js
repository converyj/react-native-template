// entry state in store

import { RECIEVE_ENTRIES, ADD_ENTRY } from "../actions";

// entries will be an object with the key representing a specific day with the value being the metric for specific day
function entries(state = {}, action) {
	switch (action.type) {
		case RECIEVE_ENTRIES:
			return {
				...state,
				...action.entries
			};

		case ADD_ENTRY:
			return {
				...state,
				...action.entry
			};

		default:
			return state;
	}
}

export default entries;
