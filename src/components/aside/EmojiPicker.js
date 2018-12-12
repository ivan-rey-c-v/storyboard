import React from 'react'
import { Picker } from 'emoji-mart'

import '../../emoji-mart.css'

function EmojiPicker(props) {
	return <Picker onClick={props.handleEmojiClick} />
}

export default React.memo(EmojiPicker)
