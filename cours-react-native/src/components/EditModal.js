import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './UI/AppButton';

export const EditModal = ({ visible, onCancel, value, onSave }) => {

	const [title, setTitle] = useState(value);
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Ошибка',
				`Минимальная длинна названия 3 символа.Сейчас ${title.trim().length} символов!`)
		} else {
			onSave(title)
		}
	}

	return (
		<Modal visible={visible} animationType='slide'  >
			<View style={style.wrap} >
				<TextInput
					value={title}
					onChangeText={setTitle}
					style={style.input}
					placeholder='Новое название'
					maxLength={64} />
				<View style={style.buttons} >
					<AppButton
						onPress={saveHandler}>
						Сохранить
					</AppButton>
					<AppButton
						onPress={onCancel}
						color={THEME.DANGER_COLOR} >
						Отменить
						</AppButton>
				</View>
			</View>
		</Modal>
	)
}

const style = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		padding: 10,
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})