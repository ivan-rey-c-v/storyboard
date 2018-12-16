import React, { useCallback } from 'react'

import TextInput from './TextInput'
import FontAndColor from './FontAndColor'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
	}, [])

	return (
		<div>
			<TextInput
				textValue={props.currentText.text}
				handleOnTextInputChange={props.handleOnTextInputChange}
				preventPropagation={preventPropagation}
			/>
			<AdditionalProperties
				currentText={props.currentText}
				preventPropagation={preventPropagation}
				handleToggleFontStyle={props.handleToggleFontStyle}
				handleChangeAlign={props.handleChangeAlign}
				handleChangeFontSize={props.handleChangeFontSize}
			/>
			<FontAndColor
				fontFamily={props.currentText.fontFamily}
				handleOnTextInputChange={props.handleOnTextInputChange}
				preventPropagation={preventPropagation}
				currentText={props.currentText}
				handleOnColorChange={props.handleOnColorChange}
			/>
		</div>
	)
}

export default React.memo(TextProperties)
