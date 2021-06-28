import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReduser } from './todoReduser'

export const TodoState = ({ children }) => {
	const initialState = {
		todos: []
	}

	const { changeScreen } = useContext(ScreenContext)

	const [state, dispath] = useReducer(todoReduser, initialState)

	const addTodo = title => dispath({ type: ADD_TODO, title })

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
