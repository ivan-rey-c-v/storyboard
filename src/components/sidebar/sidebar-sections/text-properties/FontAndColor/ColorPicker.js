import React from 'react'
import styled from 'styled-components/macro'
import { SketchPicker } from 'react-color'

function ColorPicker(props) {
	return (
		<PickerContainer>
			<SketchPicker {...props} />
		</PickerContainer>
	)
}

const PickerContainer = styled.div`
	position: absolute;
	bottom: calc(100% + 0.5rem);
	left: 0;
	z-index: 6;
`

export default React.memo(ColorPicker)
