import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import History from "./components/History";
import {
	createBottomTabNavigator,
	createMaterialTopTabNavigator
} from "react-navigation-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { purple, white } from "./utils/colors";
import AddEntry from "./components/AddEntry";
import { createAppContainer } from "react-navigation";
import Constants from "expo-constants";
import { createStackNavigator } from "react-navigation-stack";
import EntryDetails from "./components/EntryDetails";

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}

// Tab Navigation
const tabObject = {
	History: {
		screen: History,
		navigationOptions: {
			tabBarLabel: "History",
			tabBarIcon: ({ tintColor }) => (
				<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
			)
		}
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: "Add Entry",
			tabBarIcon: ({ tintColor }) => (
				<FontAwesome name="plus-square" size={30} color={tintColor} />
			)
		}
	}
};
// usually one object with tabs
const options = {
	navigationOptions: {
		// get rid of any headers
		headers: null
	},
	// style tabBar
	tabBarOptions: {
		activeTintColor: Platform.OS === "ios" ? purple : white,
		style: {
			height: 56,
			backgroundColor: Platform.OS === "ios" ? white : purple,
			shadowColor: "rgba(0, 0, 0, 0.24)",
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1,
			showIcon: true,
			padding: 10
		}
	}
};

// customize tabs based on Platform
const Tabs = createAppContainer(
	Platform.OS === "ios"
		? createBottomTabNavigator(tabObject, options)
		: createMaterialTopTabNavigator(tabObject, options)
);

// Stack Navigation
const Stack = createAppContainer(
	createStackNavigator({
		Home: {
			screen: Tabs,
			navigationOptions: {
				header: null
			}
		},
		EntryDetails: {
			screen: EntryDetails,
			navigationOptions: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: purple
				}
			}
		}
	})
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer, middleware)}>
				<View style={{ flex: 1 }}>
					<UdaciStatusBar
						backgroundColor={purple}
						barStyle="light-content"
					/>
					<Stack />
				</View>
			</Provider>
		);
	}
}
