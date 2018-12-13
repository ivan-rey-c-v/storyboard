import React from 'react'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	return (
		<div>
			<TextInput
				textValue={props.textValue}
				handleOnTextInputChange={props.handleOnTextInputChange}
			/>
			<AdditionalProperties />
			<FontSelect
				fontFamily={props.fontFamily}
				handleOnTextInputChange={props.handleOnTextInputChange}
			/>
		</div>
	)
}

export default React.memo(TextProperties)
