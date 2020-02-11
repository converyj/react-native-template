/**
 * add/change entry for specific day: 
 *   - submit state of metrics 
 *   - reset state of metrics 
*/
import React, { Component } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from "./../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from "./../utils/api";
import { addEntry } from "../actions";
import { connect } from "react-redux";
import { white, purple } from "./../utils/colors";
import { NavigationActions } from "react-navigation";

function SubmitBtn({ onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={Platform.OS === "ios" ? styles.iosSubmitButton : styles.androidSubmitButton}>
			<Text style={styles.submitText}>Submit</Text>
		</TouchableOpacity>
	);
}
// form to input metrics
class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0
	};

	// function for increasing value of run, bike, swim metrics
	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric);

		this.setState((state) => {
			const count = state[metric] + step;

			return {
				...state,
				[metric]: count > max ? max : count
			};
		});
	};

	// function for decreasing value of run, bike, swim metrics
	decrement = (metric) => {
		const { max, step } = getMetricMetaInfo(metric);

		this.setState((state) => {
			const count = state[metric] - step;

			return {
				...state,
				[metric]: count < 0 ? 0 : count
			};
		});
	};

	// function for setting the value of the slider of sleep, eat metrics
	slide = (metric, value) => {
		this.setState({
			[metric]: value
		});
	};

	// submit the metrics for a specific day
	// grab the key for the specific day
	submit = () => {
		const key = timeToString();
		const entry = this.state;

		// Update Redux
		this.props.dispatch(
			addEntry({
				[key]: entry
			})
		);

		this.setState({
			run: 0,
			bike: 0,
			swim: 0,
			sleep: 0,
			eat: 0
		});

		// Navigate to home
		this.toHome();

		// Save to 'DB'
		submitEntry({ key, entry });

		// Clear local notification
	};

	// reset the metrics for that specific day and remove entry from database
	reset = () => {
		const key = timeToString();

		// Update Redux
		// set date to default value = 'Don't forget to log your data today!'
		this.props.dispatch(
			addEntry({
				[key]: getDailyReminderValue()
			})
		);

		// Route to Home
		this.toHome();
		// Update 'DB'
		removeEntry({ key });
	};

	// ? same as navigation.goBack() doesn't work though ?
	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: "AddEntry" }));
	};
	render() {
		const metaInfo = getMetricMetaInfo();
		if (this.props.alreadyLogged) {
			return (
				<View style={styles.center}>
					<Ionicons
						name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
						size={100}
						color="black"
					/>
					<Text>You have already logged your information today</Text>
					<TextButton onPress={this.reset}>Reset</TextButton>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<DateHeader date={new Date().toLocaleDateString()} />
				{Object.keys(metaInfo).map((metric) => {
					const { getIcon, type, ...rest } = metaInfo[metric];
					const value = this.state[metric];

					return (
						<View style={styles.row} key={metric}>
							{getIcon()}
							{type === "slider" ? (
								<UdaciSlider
									value={value}
									onChange={(value) => this.slide(metric, value)}
									{...rest}
								/>
							) : (
								<UdaciStepper
									value={value}
									onIncrement={() => this.increment(metric)}
									onDecrement={() => this.decrement(metric)}
									{...rest}
								/>
							)}
						</View>
					);
				})}
				<SubmitBtn onPress={this.submit} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20
	},
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	iosSubmitButton: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7
	},
	androidSubmitButton: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		alignSelf: "flex-end",
		borderRadius: 2,
		marginLeft: 20
	},
	submitText: {
		color: white,
		textAlign: "center",
		fontSize: 22,
		textTransform: "uppercase"
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});
/**
 * return whether user has logged entries for today 
 *  - check if the specific day exists (not null)
 *  - check if the specific day has a today property on it from getDailyReminders()
 *     - if undefined = user already logged entires for specific day 
 *     - if not undefined = user reset entries and haven't logged yet
 */
function mapStateToProps(state) {
	const key = timeToString();

	return {
		alreadyLogged: state[key] && typeof state[key].today === "undefined"
	};
}

export default connect(mapStateToProps)(AddEntry);
