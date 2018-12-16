import React from 'react'
import Picker from 'rc-color-picker'

import '../../../css/rc-color-picker.css'

function ColorPicker(props) {
	const { fillName, opacityName } = props
	const { [fillName]: fill, [opacityName]: opacity } = props.currentText

	return (
		<Picker
			defaultColor="black"
			className="color-picker"
			color={fill}
			alpha={opacity * 100}
			onChange={props.handleOnColorChange(fillName, opacityName)}
			placement="topLeft"
		>
			{props.children}
		</Picker>
	)
}

export default React.memo(ColorPicker)
