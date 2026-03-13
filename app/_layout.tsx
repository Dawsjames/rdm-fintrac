import {
	JetBrainsMono_100Thin,
	JetBrainsMono_200ExtraLight,
	JetBrainsMono_300Light,
	JetBrainsMono_400Regular,
	JetBrainsMono_500Medium,
	JetBrainsMono_600SemiBold,
	JetBrainsMono_700Bold,
	JetBrainsMono_800ExtraBold,
} from '@expo-google-fonts/jetbrains-mono'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import '../global.css'

import { useColorScheme } from '@/hooks/use-color-scheme'

export const unstable_settings = {
	anchor: '(tabs)',
}

export default function RootLayout() {
	const colorScheme = useColorScheme()

	const [fontsLoaded] = useFonts({
		JetBrainsMono_100Thin,
		JetBrainsMono_200ExtraLight,
		JetBrainsMono_300Light,
		JetBrainsMono_400Regular,
		JetBrainsMono_500Medium,
		JetBrainsMono_600SemiBold,
		JetBrainsMono_700Bold,
		JetBrainsMono_800ExtraBold,
	})

	if (!fontsLoaded) return null

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	)
}
