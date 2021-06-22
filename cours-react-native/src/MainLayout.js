import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Navbar } from './components/Navbar'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { THEME } from './theme';
import { TodoContext } from './context/todo/todoContext'

export const MainLayout = () => {
	const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext)
	const [todoId, setTodoId] = useState(null);
	// const [todos, setTodos] = useState([]);

	// const addTodo = title => {
	// 	// 	const newTodo = {
	// 	// 		id: Date.now().toString(),
	// 	// 		title,

	// 	// setTodos((prevTodos) => {
	// 	// 	return [
	// 	// 		...prevTodos,
	// 	// 		newTodo
	// 	// 	]
	// 	// })
	// 	setTodos(prev => [
	// 		...prev,
	// 		{
	// 			id: Date.now().toString(),
	// 			title,
	// 		}
	// 	])
	// }

	// const removeTodo = (id) => {
	// 	const todo = todos.find(t => t.id === id)
	// 	Alert.alert(
	// 		'Удаление элемента',
	// 		`Вы уверены что хотите удалить "${todo.title}" ?`,
	// 		[
	// 			{
	// 				text: 'Отмена',
	// 				style: 'cancel',
	// 			},
	// 			{
	// 				text: 'Удалить',

	// 				onPress: () => {
	// 					setTodoId(null),
	// 						setTodos(prev => prev.filter((todo => todo.id !== id)))
	// 				}
	// 			},
	// 		],
	// 		{ cancelable: false }
	// 	);

	// }

	// const updateTodo = (id, title) => {
	// 	setTodos(old => old.map(todo => {
	// 		if (todo.id === id) {
	// 			todo.title = title
	// 		}
	// 		return todo
	// 	}))
	// }

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
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PDDING_HORIZONTAL,
		paddingVertical: 20
	},


});