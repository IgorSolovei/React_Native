import React, { useReducer } from 'react'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReduser } from './todoReduser'

export const TodoState = ({ children }) => {
	const initialState = {
		todos: []
	}

	const [state, dispath] = useReducer(todoReduser, initialState)

	const addTodo = title => dispath({ type: ADD_TODO, title })

	const removeTodo = id => dispath({ type: REMOVE_TODO, id })

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
