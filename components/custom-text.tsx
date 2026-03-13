import { Text, TextProps } from 'react-native'

//How to use: add the weight prop to the CustomText component, and it will use the corresponding font. For example:
// <CustomText weight='400'
// className='text-2xl text-foreground'>Settings</CustomText>

type Weight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800'

const fonts: Record<Weight, string> = {
	'100': 'JetBrainsMono_100Thin',
	'200': 'JetBrainsMono_200ExtraLight',
	'300': 'JetBrainsMono_300Light',
	'400': 'JetBrainsMono_400Regular',
	'500': 'JetBrainsMono_500Medium',
	'600': 'JetBrainsMono_600SemiBold',
	'700': 'JetBrainsMono_700Bold',
	'800': 'JetBrainsMono_800ExtraBold',
}

type CustomTextProps = TextProps & { weight?: Weight }

export function CustomText({ weight = '400', ...props }: CustomTextProps) {
	return (
		<Text {...props} style={[{ fontFamily: fonts[weight] }, props.style]} />
	)
}
