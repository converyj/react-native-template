/*
Two Actions:
 1. calendar view - recieve entries 
 2. add entry 
*/

export const RECIEVE_ENTRIES = "RECIEVE_ENTRIES";
export const ADD_ENTRY = "ADD_ENTRY";

// recieve all entries from storage and add to store
export function recieveEntries(entries) {
	return {
		type: RECIEVE_ENTRIES,
		entries
	};
}

// add new entry
export function addEntry(entry) {
	return {
		type: ADD_ENTRY,
		entry
	};
}
