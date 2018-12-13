import React from 'react'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	return (
		<div>
			<TextInput
				storeDispatch={props.storeDispatch}
				textValue={props.textValue}
				handleOnTextChange={props.handleOnTextChange}
			/>
			<AdditionalProperties />
			<FontSelect />
		</div>
	)
}

export default React.memo(TextProperties)
