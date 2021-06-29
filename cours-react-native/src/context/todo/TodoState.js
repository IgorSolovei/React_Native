import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
	ADD_TODO,
	CLEAR_ERROR,
	HIDE_LOADER,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO
} from '../types'
import { TodoContext } from './todoContext'
import { todoReduser } from './todoReduser'

export const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	}

	const { changeScreen } = useContext(ScreenContext)

	const [state, dispath] = useReducer(todoReduser, initialState)

	const addTodo = async title => {
		const response = await fetch('https://rn-todo-app-60a04-default-rtdb.firebaseio.com/todos.json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title })
		})
		const data = await response.json()

		dispath({ type: ADD_TODO, title, id: data.name })
	}

	const removeTodo = id => {
		const todo = state.todos.find(t => t.id === id)
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
						changeScreen(null)
						dispath({ type: REMOVE_TODO, id })
					}
				},
			],
			{ cancelable: false }
		);

	}

	const updateTodo = (id, title) => dispath({ type: UPDATE_TODO, id, title })

	const showLoader = () => dispath({ type: SHOW_LOADER })

	const hideLoader = () => dispath({ type: HIDE_LOADER })

	const showError = error => dispath({ type: SHOW_ERROR, error })

	const clearError = () => dispath({ type: CLEAR_ERROR })

	return <TodoContext.Provider
		value={{
			todos: state.todos,
			addTodo,
			removeTodo,
			updateTodo,
		}}>
		{children}
	</TodoContext.Provider>
}
