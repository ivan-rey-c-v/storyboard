import React, { useCallback } from 'react'

import { SidebarSection, SectionName, Button } from '../Sidebar.styles'
import TextArea from './text-properties/TextArea'
import TextProperties from './text-properties/TextProperties'
import Fonts from './text-properties/Fonts'
import Colors from './text-properties/colors/Colors'

function AddText(props) {
	const { storeDispatch, currentText } = props

	const handleAddText = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		storeDispatch({ type: 'ADD_TEXT' })
	}, [])

	const stopPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		console.info('should stop propagating event')
	}, [])

	return (
		<SidebarSection onClick={stopPropagation}>
			<SectionName>Text</SectionName>
			<Button onClick={handleAddText}>Add text</Button>

			{currentText && (
				<>
					<TextArea
						textValue={currentText.text}
						storeDispatch={storeDispatch}
					/>

					<TextProperties
						currentText={currentText}
						storeDispatch={storeDispatch}
					/>

					<Fonts
						currentText={currentText}
						storeDispatch={storeDispatch}
					/>

					<Colors
						currentText={currentText}
						storeDispatch={storeDispatch}
					/>
				</>
			)}
		</SidebarSection>
	)
}

export default React.memo(AddText)
