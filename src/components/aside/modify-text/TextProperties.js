import React from 'react'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	return (
		<div>
			<TextInput
				textValue={props.currentText.text}
				handleOnTextInputChange={props.handleOnTextInputChange}
			/>
			<AdditionalProperties
				handleOnColorChange={props.handleOnColorChange}
				currentText={props.currentText}
			/>
			<FontSelect
				fontFamily={props.currentText.fontFamily}
				handleOnTextInputChange={props.handleOnTextInputChange}
			/>
		</div>
	)
}

export default React.memo(TextProperties)
