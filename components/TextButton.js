import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { purple } from "./../utils/colors";

const TextButton = ({ children, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={{
					color: purple,
					fontSize: 18,
					padding: 10,
					textAlign: "center"
				}}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default TextButton;
