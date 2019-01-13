import React, { useCallback, lazy, Suspense } from 'react'
import styled from 'styled-components/macro'

const ColorPicker = lazy(_ => import('./ColorPicker'))

const presetColors = [
	'#D0021B',
	'#F5A623',
	'#F8E71C',
	'#8B572A',
	'#7ED321',
	'#417505',
	'#BD10E0',
	'#9013FE',
	'#4A90E2',
	'#50E3C2',
	'#B8E986',
	'#000000',
	'#4A4A4A',
	'#9B9B9B',
	'#FFFFFF'
]

function ColorSwatch(props) {
	const {
		name,
		storeDispatch,
		handleOnColorChange,
		isColorPickerActive,
		color,
		opacity,
		position
	} = props

	const handleOpenPicker = useCallback(function(event) {
		storeDispatch({ type: 'SET_COLOR_PICKER', colorPickerName: name })
		return () => {
			//storeDispatch({ type: 'SET_COLOR_PICKER', colorPickerName: null })
		}
	}, [])

	return (
		<Swatch onClick={handleOpenPicker}>
			{isColorPickerActive && (
				<Suspense fallback={<div />}>
					<ColorPicker
						position={position}
						color={color}
						name={name}
						onChange={handleOnColorChange}
						presetColors={presetColors}
					/>
				</Suspense>
			)}
			<ColoredBox color={color} opacity={opacity} />
		</Swatch>
	)
}

const Swatch = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`
const ColoredBox = styled.div`
	cursor: pointer;
	height: 100%;
	width: 100%;
	border-radius: 4px;

	opacity: ${props => props.opacity};
	background-color: ${props => props.color};
`

export default React.memo(ColorSwatch)
