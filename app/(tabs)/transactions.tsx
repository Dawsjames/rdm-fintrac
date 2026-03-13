import { CustomText } from '@/components/custom-text'
import { View } from 'react-native'

export default function TransactionsScreen() {
	return (
		<View className='flex-1 items-center justify-center bg-background'>
			<CustomText className='text-2xl font text-foreground'>
				Transactions
			</CustomText>
		</View>
	)
}
