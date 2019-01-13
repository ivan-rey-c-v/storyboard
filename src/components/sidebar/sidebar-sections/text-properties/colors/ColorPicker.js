import React from 'react'
import styled, { css } from 'styled-components/macro'
import { SketchPicker } from 'react-color'

function ColorPicker(props) {
	return (
		<PickerContainer position={props.position}>
			<SketchPicker {...props} />
		</PickerContainer>
	)
}

const PickerContainer = styled.div`
	position: absolute;
	left: 0;
	z-index: 6;
	bottom: ${props =>
		props.position === 'bottom' ? '-308px' : 'calc(100% + 0.5rem)'};
`

export default React.memo(ColorPicker)
