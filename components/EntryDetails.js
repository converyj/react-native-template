import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import MetricCard from "./MetricCard";
import TextButton from "./TextButton";
import { getDailyReminderValue, timeToString } from "../utils/helpers";
import { removeEntry } from "../utils/api";
import { addEntry } from "./../actions";

/**
 * More details on specific entry called from History Component
 */
class EntryDetails extends Component {
	// dynamically customize header
	static navigationOptions = ({ navigation }) => {
		const { entryId } = navigation.state.params;

		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);

		return {
			title: `${year}/${month}/${day}`,
			headerBackTitleVisible: false
		};
	};

	// reset entry in store, goBack to previous page, remove entry from storage
	reset = () => {
		const { remove, goBack, entryId } = this.props;

		remove();
		goBack();
		removeEntry(entryId);
	};

	/**
	 * will rerender component when reset button is pressed because EntryDetails is still in the route stack
	 * - metrics is removed at this point and undefined so MetricCard will break 
	 * - only rerender if metrics is not null and does not have a today property - defined in remove method when reset is pressed
	 */
	shouldComponentUpdate(nextProps) {
		return nextProps.metrics !== null && !nextProps.metrics.today;
	}

	render() {
		return (
			<View style={styles.container}>
				<MetricCard metrics={this.props.metrics} />
				<TextButton onPress={this.reset}>Reset</TextButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15
	}
});

/**
 * Reset entry
 *  - remove entry for specific day 
 *  - go back to home
 */
function mapDispatchToProps(dispatch, { navigation }) {
	const { entryId } = navigation.state.params;
	return {
		/**
	 * if entry is from today, assign key to reminder
	 * if entry was a past day, assign key to null
	 * */
		remove: () =>
			dispatch(
				addEntry({
					[entryId]: timeToString() === entryId ? getDailyReminderValue() : null
				})
			),
		goBack: () => navigation.goBack()
	};
}

/**
 * get the metrics for specific day from entryId = key, to pass to MetricCard Component
 */
function mapStateToProps(entries, { navigation }) {
	const { entryId } = navigation.state.params;

	return {
		entryId,
		metrics: entries[entryId]
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails);
