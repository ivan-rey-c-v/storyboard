import React, { useCallback } from 'react'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
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
				handleOnColorChange={props.handleOnColorChange}
				currentText={props.currentText}
				preventPropagation={preventPropagation}
			/>
			<FontSelect
				fontFamily={props.currentText.fontFamily}
				handleOnTextInputChange={props.handleOnTextInputChange}
				preventPropagation={preventPropagation}
			/>
		</div>
	)
}

export default React.memo(TextProperties)
