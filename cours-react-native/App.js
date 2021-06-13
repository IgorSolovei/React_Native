import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar';
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

async function LoadAplication() {
	await Font.loadAsync({
		'roboto-regular': require('./assets/Fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/Fonts/Roboto-Bold.ttf')
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)
	const [todoId, setTodoId] = useState(null);
	const [todos, setTodos] = useState([]);

	if (!isReady) {
		return (
			<AppLoading startAsync={LoadAplication}
				onError={err => console.log(err)}
				onFinish={() => setIsReady(true)} />
		)
	}

	const addTodo = title => {
		// 	const newTodo = {
		// 		id: Date.now().toString(),
		// 		title,

		// setTodos((prevTodos) => {
		// 	return [
		// 		...prevTodos,
		// 		newTodo
		// 	]
		// })
		setTodos(prev => [
			...prev,
			{
				id: Date.now().toString(),
				title,
			}
		])
	}

	const removeTodo = (id) => {
		const todo = todos.find(t => t.id === id)
		Alert.alert(
			'Удаление элемента',
			`Вы уверены что хотите удалить "${todo.title}" ?`,
			[
				{
					text: 'Отмена',
					style: 'cancel',
				},
				{
					text: 'Удалить',

					onPress: () => {
						setTodoId(null),
							setTodos(prev => prev.filter((todo => todo.id !== id)))
					}
				},
			],
			{ cancelable: false }
		);

	}

	const updateTodo = (id, title) => {
		setTodos(old => old.map(todo => {
			if (todo.id === id) {
				todo.title = title
			}
			return todo
		}))
	}

	let content = (
		<MainScreen todos={todos}
			addTodo={addTodo}
			removeTodo={removeTodo}
			openTodo={setTodoId} />
	)

	if (todoId) {
		const selectedTodo = todos.find(todo => todo.id === todoId)
		content = <TodoScreen
			onRemove={removeTodo}
			goBack={() => setTodoId(null)}
			todo={selectedTodo}
			onSave={updateTodo} />
	}

	return (
		<View>
			<Navbar title='Планировщик задач' />
			<View style={styles.container}>
				{content}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PDDING_HORIZONTAL,
		paddingVertical: 20
	},


});
