import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';
import { AppLoader } from '../components/UI/AppLoader';
import { AppText } from '../components/UI/AppText';
import { AppButton } from '../components/UI/AppButton';

export const MainScreen = () => {
	const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
	const { changeScreen } = useContext(ScreenContext)
	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get('window').width - THEME.PDDING_HORIZONTAL * 2
	)

	const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

	useEffect(() => {
		loadTodos()
	}, [])

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PDDING_HORIZONTAL * 2
			setDeviceWidth(width)
		}
		Dimensions.addEventListener('change', update)
		return () => {
			Dimensions.removeEventListener('change', update)
		}
	})


	if (loading) {
		return <AppLoader />
	}

	if (error) {
		return <View style={style.center}>
			<AppText style={style.error}>
				{error}
			</AppText>
			<AppButton onPress={loadTodos} > Повторить</AppButton >
		</View >
	}

	let content = (

		<View style={{ width: deviceWidth }} >
			<FlatList
				keyExtractor={item => item.id.toString()}
				data={todos}
				renderItem={({ item }) => (
					<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
				)}
			/>
		</View>
	)

	if (todos.length === 0) {
		content = <View style={style.imgWrap}>
			{/* <Image
				style={style.img}
				source={require('../../assets/no-items.png')} /> */}
			<Image
				style={style.img}
				source={{
					uri:
						'https://thumbs.dreamstime.com/b/%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D1%89%D0%B8%D0%BA-%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%D0%BE%D0%B2-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-163025390.jpg'
				}} />
		</View>

	}

	return (
		<View>
			<AddTodo onSubmit={addTodo} />
			{content}
			{/* <ScrollView >
			{todos.map(todo => (
				<Todo todo={todo} key={todo.id} onRemove={removeTodo} />
			))}
		</ScrollView> */}
		</View>)
}

const style = StyleSheet.create({
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR
	}

})