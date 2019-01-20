import React, { useCallback } from 'react'

import { SidebarSection, SectionName, Button } from '../Sidebar.styles'
import TextArea from './text-properties/TextArea'
import TextProperties from './text-properties/TextProperties'
import Fonts from './text-properties/Fonts'
import Colors from './text-properties/colors/Colors'

function AddText(props) {
	const {
		storeDispatch,
		activeTextShapeID,
		currentTextShape,
		activeColorPickerID
	} = props

	const handleAddText = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		storeDispatch({ type: 'ADD_TEXT' })
	}, [])

	const stopPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
	}, [])

	return (
		<SidebarSection onClick={stopPropagation}>
			<SectionName>Text</SectionName>
			<Button onClick={handleAddText}>Add text</Button>

			{currentTextShape && (
				<>
					<TextArea
						textValue={currentTextShape.text}
						storeDispatch={storeDispatch}
					/>

					<TextProperties
						currentTextShape={currentTextShape}
						storeDispatch={storeDispatch}
					/>

					<Fonts
						currentTextShape={currentTextShape}
						storeDispatch={storeDispatch}
					/>

					<Colors
						currentTextShape={currentTextShape}
						storeDispatch={storeDispatch}
						activeColorPickerID={activeColorPickerID}
					/>
				</>
			)}
		</SidebarSection>
	)
}

export default React.memo(AddText)
