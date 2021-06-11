import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { AppText } from '../components/UI/AppText'

export const Todo = ({ todo, onRemove, onOpen }) => {

	// const longPressHandler = () => {
	// 	onRemove(todo.id)
	// }


	return (
		<TouchableOpacity activeOpacity={0.5}
			onPress={() => onOpen(todo.id)}
			onLongPress={onRemove.bind(null, todo.id)}>

			<View style={style.todo}>
				<AppText>{todo.title}</AppText>
			</View>
		</TouchableOpacity >

	)
}

const style = StyleSheet.create({
	todo: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		//borderWidth: 1,
		borderColor: '#336600',
		borderRadius: 5,
		marginBottom: 10
	},

})