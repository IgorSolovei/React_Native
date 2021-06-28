import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';
import { MainLayout } from './src/MainLayout';


async function LoadAplication() {
	await Font.loadAsync({
		'roboto-regular': require('./assets/Fonts/Roboto-Regular.ttf'),
		'roboto-bold': require('./assets/Fonts/Roboto-Bold.ttf')
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)


	if (!isReady) {
		return (
			<AppLoading startAsync={LoadAplication}
				onError={err => console.log(err)}
				onFinish={() => setIsReady(true)} />
		)
	}



	return (
		<ScreenState>
			<TodoState>
				<MainLayout />
			</TodoState>
		</ScreenState>
	)


}


