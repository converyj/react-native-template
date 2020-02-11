import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { purple, gray, white } from "./../utils/colors";

const UdaciStepper = ({ value, unit, onIncrement, onDecrement }) => {
	return (
		<View
			style={[
				styles.row,
				{ justifyContent: "space-between" }
			]}>
			{Platform.OS === "ios" ? (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[
							styles.iosBtn,
							{
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0
							}
						]}
						onPress={onDecrement}>
						<Entypo name="minus" size={30} color={purple} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.iosBtn,
							{
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0
							}
						]}
						onPress={onIncrement}>
						<Entypo name="plus" size={30} color={purple} />
					</TouchableOpacity>
				</View>
			) : (
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={[
							styles.androidBtn,
							{
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0
							}
						]}
						onPress={onDecrement}>
						<FontAwesome name="minus" size={30} color={white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.androidBtn,
							{
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0
							}
						]}
						onPress={onIncrement}>
						<FontAwesome name="plus" size={30} color={white} />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.metricCount}>
				<Text style={{ fontSize: 24, textAlign: "center" }}>
					{value}
				</Text>
				<Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	iosBtn: {
		borderColor: purple,
		borderWidth: 1,
		backgroundColor: white,
		padding: 5,
		paddingLeft: 25,
		paddingRight: 25,
		borderRadius: 7
	},
	androidBtn: {
		backgroundColor: purple,
		borderColor: gray,
		margin: 5,
		padding: 10,
		borderRadius: 2
	},
	metricCount: {
		width: 86,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default UdaciStepper;
