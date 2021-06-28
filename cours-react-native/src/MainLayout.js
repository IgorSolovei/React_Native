import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Navbar } from './components/Navbar'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { THEME } from './theme';
import { TodoContext } from './context/todo/todoContext'
import { ScreenContext } from './context/screen/screenContext'

export const MainLayout = () => {
	const { todoId } = useContext(ScreenContext)
	return (
		<View>
			<Navbar title='Планировщик задач' />
			<View style={styles.container}>
				{todoId ? <TodoScreen /> : <MainScreen />}
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