import { Tabs } from 'expo-router'
import React from 'react'

import { HapticTab } from '@/components/haptic-tab'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarLabelStyle: { fontFamily: 'JetBrainsMono_400Regular' },
			}}
		>
			<Tabs.Screen
				name='dashboard'
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='home-outline' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='transactions'
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='list-outline' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name='settings' size={28} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
