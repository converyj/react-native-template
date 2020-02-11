import React, { Component } from "react";
import { Text, View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { fetchCalendarResults } from "./../utils/api";
import { recieveEntries, addEntry } from "./../actions";
import { timeToString, getDailyReminderValue } from "./../utils/helpers";
import { connect } from "react-redux";
import UdaciFitnessCalendar from "udacifitness-calendar";
import { white } from "./../utils/colors";
import DateHeader from "./DateHeader";
import MetricCard from "./MetricCard";
import { AppLoading } from "expo";
import EntryDetails from "./EntryDetails";

/**
 * Show calendar and entries for specific day 
 */
class History extends Component {
	state = {
		ready: false
	};
	/**
	 * fetch calendar entries from storage and update the store 
	 * if there is no entries for the specific day, add entry set to daily reminder in store
	 */
	componentDidMount() {
		const { dispatch } = this.props;

		fetchCalendarResults()
			.then((entries) => dispatch(recieveEntries(entries)))
			.then(({ entries }) => {
				if (!entries[timeToString()]) {
					dispatch(
						addEntry({
							[timeToString()]: getDailyReminderValue()
						})
					);
				}
			})
			.then(() => this.setState({ ready: true }));
	}

	/**
	 * show entries for specific date
	 * Parameters: object - today = reminder to log entries from getDailyReminder(), metrics = entries for specific day 
	 */
	renderItem = ({ today, ...metrics }, formattedDate, key) => (
		<View style={styles.item}>
			{today ? (
				// show 'Don't forget to log data for today'
				<View>
					<DateHeader date={formattedDate} />
					<Text style={styles.noDataText}>{today}</Text>
				</View>
			) : (
				// show entries
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate("EntryDetails", {
							entryId: key
						})}>
					<MetricCard date={formattedDate} metrics={metrics} />
				</TouchableOpacity>
			)}
		</View>
	);

	/**
	 * entries for specific day is null 
	 */
	renderEmptyDate(formattedDate) {
		return (
			<View style={styles.item}>
				<DateHeader date={formattedDate} />
				<Text style={styles.noDataText}>You didn't log any data on this day.</Text>
			</View>
		);
	}

	render() {
		const { entries } = this.props;
		const { ready } = this.state;

		if (ready === false) {
			return <AppLoading />;
		}
		return (
			<UdaciFitnessCalendar
				items={entries} // all entries
				renderItem={this.renderItem} // render specific day
				renderEmptyDate={this.renderEmptyDate} // specific day has no entries (null)
			/>
		);
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === "ios" ? 16 : 2,
		padding: 20,
		margin: 10,
		marginTop: 17,
		justifyContent: "center",
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: "rgba(0, 0, 0, 0.24)",
		shadowOffset: {
			width: 0,
			height: 3
		}
	},
	noDataText: {
		paddingTop: 20,
		paddingBottom: 10,
		fontSize: 18
	}
});

/**
 * get all entries from store 
 */
function mapStateToProps(entries) {
	return {
		entries
	};
}

export default connect(mapStateToProps)(History);
