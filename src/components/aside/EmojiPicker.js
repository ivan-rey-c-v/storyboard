import React from 'react'
import { Picker } from 'emoji-mart'

import '../../css/emoji-mart.css'

function EmojiPicker(props) {
	return (
		<Picker
			onClick={props.handleEmojiClick}
			emoji="point_up"
			title="Pick your emoji..."
		/>
	)
}

export default React.memo(EmojiPicker)
