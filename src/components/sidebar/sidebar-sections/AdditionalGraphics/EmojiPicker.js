import React from 'react'
import { Picker } from 'emoji-mart'

import '../../../../css/emoji-mart.css'

function EmojiPicker(props) {
	return <Picker {...props} emoji="point_up" title="Pick your emoji..." />
}

export default React.memo(EmojiPicker)
