import React, { useCallback, useState, lazy, Suspense } from 'react'
import styled from 'styled-components/macro'

const ColorPicker = lazy(_ => import('./ColorPicker'))

function ColorSwatch(props) {
	const { storeDispatch, fillName, opacityName, color, opacity } = props
	const [pickerActive, setPickerActive] = useState(false)

	const handleOpenPicker = useCallback(function(event) {
		event.stopPropagation()
		setPickerActive(true)
	}, [])

	const handleClosePicker = useCallback(function(event) {
		event.stopPropagation()
		setPickerActive(false)
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
			{pickerActive && (
				<>
					<Overlay onClick={handleClosePicker} />
					<Suspense fallback={<div />}>
						<ColorPicker onChange={handleOnColorChange} />
					</Suspense>
				</>
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
