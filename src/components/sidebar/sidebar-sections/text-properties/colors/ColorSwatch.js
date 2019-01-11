import React, { useCallback, useState, lazy, Suspense } from 'react'
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
		isColorPickerActive,
		fillName,
		opacityName,
		color,
		opacity
	} = props

	const handleOpenPicker = useCallback(function(event) {
		storeDispatch({ type: 'SET_COLOR_PICKER', colorPickerName: name })
	}, [])

	const handleOnColorChange = useCallback(function(color, event) {
		const properties = {
			[fillName]: color.hex,
			[opacityName]: color.rgb.a
		}

		storeDispatch({ type: 'MODIFY_TEXT', properties })
	}, [])

	return (
		<Swatch onClick={handleOpenPicker}>
			{isColorPickerActive && (
				<Suspense fallback={<div />}>
					<ColorPicker
						color={color}
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
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
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
