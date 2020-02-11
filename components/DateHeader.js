import React from "react";
import { View, Text } from "react-native";
import { purple } from "./../utils/colors";

const DateHeader = ({ date }) => {
	return <Text style={{ fontSize: 25, color: purple }}>{date}</Text>;
};

export default DateHeader;
