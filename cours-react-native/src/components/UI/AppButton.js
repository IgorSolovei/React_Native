import React from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';


export const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR }) => {

	const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

	return (
		<Wrapper onPress={onPress} activeOpacity={0.7} >
			<View style={{ ...style.button, backgroundColor: color }}>
				<AppTextBold style={style.text} >{children}</AppTextBold>
			</View>
		</Wrapper>
	)
}


const style = StyleSheet.create({
	button: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 7,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#fff'
	}
})

