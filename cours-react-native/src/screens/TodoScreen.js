import React, { useState } from 'react';
import { StyleSheet, View, Button } from "react-native";
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { THEME } from "../theme";
import { AppCard } from '../components/UI/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppButton } from '../components/UI/AppButton'

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
	const [modal, setModal] = useState(false)

	const saveHandler = title => {
		onSave(todo.id, title)
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
				<AppButton onPress={goBack}
					color={THEME.GREY_COLOR}>
					<AntDesign name='back' size={20} color='#fff' />
				</AppButton>
			</View>
			<View style={style.button}>
				<AppButton color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)}>
					<FontAwesome name='remove' size={20} />
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
		width: '45%',
		borderRadius: 10
	},
	title: {
		fontSize: 26
	}
})