import React from 'react'
import styled from 'styled-components'
import Picker from 'rc-color-picker'

import '../../../rc-color-picker.css'

function ColorPicker(props) {
	const { fill, opacity } = props.currentText

	return (
		<Picker
			className="color-picker"
			color={fill}
			alpha={opacity * 100}
			onChange={props.handleOnColorChange}
			placement="topLeft"
			defaultColor={fill}
		>
			<ColorPickerTrigger color={fill} />
		</Picker>
	)
}

const ColorPickerTrigger = styled.div`
	height: 2rem;
	width: 2rem;
	margin: 0.25rem;
	border-radius: 4px;
	cursor: pointer;
`

export default React.memo(ColorPicker)
