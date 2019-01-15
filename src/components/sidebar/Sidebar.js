import React from 'react'

import {
	SidebarContainer,
	SidebarSections,
	SidebarHeader
} from './Sidebar.styles'
import DownloadFooter from './DownloadFooter'
import SetBackground from './sidebar-sections/SetBackground'
import AdditionalGraphics from './sidebar-sections/AdditionalGraphics'
import AddText from './sidebar-sections/AddText'

function Sidebar(props) {
	const { state, dispatch } = props
	const { stories } = state
	const { storyIndex, shapeName, colorPickerName } = state.active

	const currentStory = stories[storyIndex]
	const [currentText] = currentStory.shapes.filter(shape => {
		if (shape.type === 'text') {
			return `${shape.id}-group` === shapeName
		}
		return false
	})

	return (
		<SidebarContainer>
			<SidebarHeader>
				<h1>story board</h1>
			</SidebarHeader>

			<SidebarSections>
				<SetBackground
					backgroundImage={currentStory.backgroundImage}
					storeDispatch={dispatch}
					storyIndex={storyIndex}
					colorPickerName={colorPickerName}
				/>

				<AdditionalGraphics storeDispatch={dispatch} />

				<AddText
					storeDispatch={dispatch}
					currentText={currentText}
					colorPickerName={colorPickerName}
				/>
			</SidebarSections>

			<DownloadFooter storeDispatch={dispatch} />
		</SidebarContainer>
	)
}

export default React.memo(Sidebar)
