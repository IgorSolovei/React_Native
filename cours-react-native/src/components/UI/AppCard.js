import React from 'react';
import { StyleSheet, View } from 'react-native';


export const AppCard = props => {
	return (<View style={{ ...style.default, ...props.style }}>
		{props.children}
	</View>
	)
}

const style = StyleSheet.create({
	default: {
		padding: 20,
		//borderWidth: 2,
		//borderColor: 'green',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: '#000',
		shadowRadius: 3,
		shadowOpacity: 0.3,
		shadowOffset: { width: 2, height: 2 },
		elevation: 10,
		backgroundColor: '#fff',
		borderRadius: 10,


	},

})