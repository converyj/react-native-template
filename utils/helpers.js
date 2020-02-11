// utils/helpers.js

import React from "react";
import { View, StyleSheet } from "react-native";
import {
	FontAwesome,
	MaterialIcons,
	MaterialCommunityIcons
} from "@expo/vector-icons";
import { white, red, orange, blue, lightPurp, pink } from "./colors";

const styles = StyleSheet.create({
	iconContainer: {
		padding: 5,
		borderRadius: 8,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 20
	}
});
export function getMetricMetaInfo(metric) {
	const info = {
		run: {
			displayName: "Run",
			max: 50,
			unit: "miles",
			step: 1,
			type: "steppers",
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: red }
						]}>
						<MaterialIcons
							name="directions-run"
							color={white}
							size={35}
						/>
					</View>
				);
			}
		},
		bike: {
			displayName: "Bike",
			max: 100,
			unit: "miles",
			step: 1,
			type: "steppers",
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: orange }
						]}>
						<MaterialCommunityIcons
							name="bike"
							color={white}
							size={32}
						/>
					</View>
				);
			}
		},
		swim: {
			displayName: "Swim",
			max: 9900,
			unit: "meters",
			step: 1,
			type: "steppers",
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: blue }
						]}>
						<MaterialCommunityIcons
							name="swim"
							color={white}
							size={35}
						/>
					</View>
				);
			}
		},
		sleep: {
			displayName: "Sleep",
			max: 24,
			unit: "hours",
			step: 1,
			type: "slider",
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: lightPurp }
						]}>
						<FontAwesome name="bed" color={white} size={30} />
					</View>
				);
			}
		},
		eat: {
			displayName: "Eat",
			max: 10,
			unit: "rating",
			step: 1,
			type: "slider",
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: pink }
						]}>
						<MaterialCommunityIcons
							name="food"
							color={white}
							size={35}
						/>
					</View>
				);
			}
		}
	};

	return typeof metric === "undefined" ? info : info[metric];
}

export function isBetween(num, x, y) {
	if (num >= x && num <= y) {
		return true;
	}

	return false;
}

export function timeToString(time = Date.now()) {
	const date = new Date(time);
	const todayUTC = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	return todayUTC.toISOString().split("T")[0];
}

/**
 * when we reset or have no entries for specific day
 */
export function getDailyReminderValue() {
	return {
		today: "👋Don't forget to log your data for today!"
	};
}
