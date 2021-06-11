import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons/build/Icons';
import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {

	const [value, setValue] = useState('')

	const pressHendler = () => {
		if (value.trim()) {
			onSubmit(value.trim())
			setValue('')
		} else {
			Alert.alert('Введите текст...')
		}
	}

	return (
		<View style={style.block}>
			<TextInput style={style.input}
				onChangeText={setValue}
				value={value}
				placeholder='введите текст...'
			//keyboardType='numeric'
			/>

			<AntDesign.Button onPress={pressHendler} name='pluscircleo'>
				Добавить
		</AntDesign.Button>
			{/* <Button title='Добавить' onPress={pressHendler} /> */}
		</View>
	)
}

const style = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15,
	},
	input: {
		width: "70 %",
		borderStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
		padding: 10,

	},
})