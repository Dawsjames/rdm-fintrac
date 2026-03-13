import { CustomText } from '@/components/custom-text'
import { View } from 'react-native'

export default function Dashboard() {
	return (
		<View className='flex-1 items-center justify-center bg-background'>
			<CustomText className='text-2xl text-foreground'>Dashboard</CustomText>
		</View>
	)
}
