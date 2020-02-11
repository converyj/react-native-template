import { AsyncStorage } from "react-native";
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from "./_calendar";

/**
 * fetch calendar from storage with formatted results 
 * why is formatCalendarResults not method with () and accepting results?
 */
export function fetchCalendarResults() {
	return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(
		formatCalendarResults
	);
}
// submitting new entry for a specific day - key = date, entry = entire metrics
// - merge existing value with new value of entry on calendar key
export function submitEntry({ entry, key }) {
	return AsyncStorage.mergeItem(
		CALENDAR_STORAGE_KEY,
		JSON.stringify({ [key]: entry })
	);
}

// remove entry for a specific day - key = date
// - set the new storage after the deleted key
export function removeEntry(key) {
	return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results);
		data[key] = undefined;
		delete data[key];
		AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
	});
}
