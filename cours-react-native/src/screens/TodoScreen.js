import React, { useState, useContext } from 'react';
import { StyleSheet, View, Button, Dimensions } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { THEME } from "../theme";
import { AppCard } from '../components/UI/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppButton } from '../components/UI/AppButton'
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
	const { todos, updateTodo, removeTodo } = useContext(TodoContext)
	const { todoId, changeScreen } = useContext(ScreenContext)

	const todo = todos.find(t => t.id === todoId)

	const [modal, setModal] = useState(false)

	const saveHandler = async title => {
		await updateTodo(todo.id, title)
		setModal(false)
	}

	return <View>

		<EditModal
			value={todo.title}
			visible={modal}
			onCancel={() => setModal(false)}
			onSave={saveHandler} />

		<AppCard style={style.card}>
			<AppTextBold style={style.title}>{todo.title}</AppTextBold>
			<AppButton onPress={() => setModal(true)}>
				<FontAwesome name='edit' size={20} />
			</AppButton>
		</AppCard>

		<View style={style.buttons}>
			<View style={style.button}>
				<AppButton
					onPress={() => changeScreen(null)}
					color={THEME.GREY_COLOR}>
					<AntDesign name='back' size={20} color='#fff' />
				</AppButton>
			</View>
			<View style={style.button}>
				<AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
					<FontAwesome name='remove' size={20} color='#fff' />
				</AppButton>
			</View>
		</View>

	</View>
}

const style = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	card: {
		// flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: "space-around",
		marginBottom: 20,
		padding: 15
	},
	button: {
		// width: Dimensions.get('window').width / 4,
		width: Dimensions.get('window').width > 400 ? 150 : 100, //! Адаптация под различные размены экрана
		borderRadius: 10
	},
	title: {
		fontSize: 26
	}
})