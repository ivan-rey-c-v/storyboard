import React from 'react'
import { NimblePicker } from 'emoji-mart'
import data from 'emoji-mart/data/apple.json'

import 'emoji-mart/css/emoji-mart.css'

function EmojiPicker(props) {
	return (
		<NimblePicker
			{...props}
			emoji="point_up"
			title="Pick your emoji..."
			set="apple"
			data={data}
		/>
	)
}

export default React.memo(EmojiPicker)
