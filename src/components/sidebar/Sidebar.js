import React, { useContext } from 'react'
import { AppContext } from '../../store/AppContext'

import {
	SidebarContainer,
	SidebarSections,
	SidebarHeader
} from './Sidebar.styles'
import DownloadFooter from './DownloadFooter'
import SelectBoard from './sidebar-sections/SelectBoard'
import SetBackground from './sidebar-sections/SetBackground'
import AdditionalGraphics from './sidebar-sections/AdditionalGraphics'

function Sidebar(props) {
	const { state, dispatch } = useContext(AppContext)
	const { stories } = state
	const { storyIndex, textIndex, shapeName } = state.active

	const currentStory = stories[storyIndex]

	return (
		<SidebarContainer>
			<SidebarHeader>
				<h1>story board</h1>
			</SidebarHeader>

			<SidebarSections>
				<SelectBoard
					currentStoryName={currentStory.canvasName}
					stories={stories}
					storeDispatch={dispatch}
				/>

				<SetBackground
					imgFile={currentStory.backgroundImage}
					storeDispatch={dispatch}
				/>

				<AdditionalGraphics storeDispatch={dispatch} />

				{/* Add/Modify text component */}
			</SidebarSections>

			<DownloadFooter storeDispatch={dispatch} />
		</SidebarContainer>
	)
}

export default React.memo(Sidebar)
