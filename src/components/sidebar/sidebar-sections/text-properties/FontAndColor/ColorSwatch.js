import React, { useCallback, useState, lazy, Suspense } from 'react'
import styled from 'styled-components/macro'

const ColorPicker = lazy(_ => import('./ColorPicker'))

function ColorSwatch(props) {
	const [pickerActive, setPickerActive] = useState(false)

	const handleOpenPicker = useCallback(function(event) {
		event.stopPropagation()
		setPickerActive(true)
	}, [])

	const handleClosePicker = useCallback(function(event) {
		event.stopPropagation()
		setPickerActive(false)
	}, [])

	return (
		<Swatch onClick={handleOpenPicker}>
			{pickerActive && (
				<>
					<Overlay onClick={handleClosePicker} />
					<Suspense fallback={<div />}>
						<ColorPicker />
					</Suspense>
				</>
			)}

			{props.children}
			<SwatchName>{props.name}</SwatchName>
		</Swatch>
	)
}

const Swatch = styled.div`
	height: 2.25rem;
	width: 2rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	position: relative;
	cursor: pointer;
`
const SwatchName = styled.p`
	font-size: 0.75rem;
	font-weight: 600;
	color: gray;
`
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
`

export default React.memo(ColorSwatch)
