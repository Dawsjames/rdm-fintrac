import { CustomText } from '@/components/custom-text'
import { View } from 'react-native'

export default function SettingsScreen() {
	return (
		<View className='flex-1 items-center justify-center bg-background'>
			<CustomText weight='400' className='text-2xl text-foreground'>
				Settings
			</CustomText>
		</View>
	)
}
