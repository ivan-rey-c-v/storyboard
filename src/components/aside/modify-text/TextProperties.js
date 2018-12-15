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
				handleOnFontStyleChange={props.handleOnFontStyleChange}
				currentText={props.currentText}
				preventPropagation={preventPropagation}
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
