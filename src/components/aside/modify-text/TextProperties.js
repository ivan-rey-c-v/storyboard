import React from 'react'

import TextInput from './TextInput'
import FontSelect from './FontSelect'
import AdditionalProperties from './AdditionalProperties'

function TextProperties(props) {
	console.log(props.textValue)

	return (
		<div>
			<TextInput storeDispatch={props.storeDispatch} />
			<AdditionalProperties />
			<FontSelect />
		</div>
	)
}

export default React.memo(TextProperties)
