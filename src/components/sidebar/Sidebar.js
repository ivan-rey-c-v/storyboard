import React from 'react'

import {
	SidebarContainer,
	SidebarSections,
	SidebarHeader
} from './Sidebar.styles'
import DownloadFooter from './DownloadFooter'
import SelectBoard from './sidebar-sections/SelectBoard'
import SetBackground from './sidebar-sections/SetBackground'
import AdditionalGraphics from './sidebar-sections/AdditionalGraphics'
import AddText from './sidebar-sections/AddText'
import TextArea from './sidebar-sections/text-properties/TextArea'
import TextProperties from './sidebar-sections/text-properties/TextProperties'
import Fonts from './sidebar-sections/text-properties/Fonts'
import Colors from './sidebar-sections/text-properties/colors/Colors'

function Sidebar(props) {
	const { state, dispatch } = props
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
					stories={stories}
					storyIndex={storyIndex}
					currentStoryID={currentStory.storyID}
					storeDispatch={dispatch}
				/>

				<SetBackground
					imgFile={currentStory.backgroundImage}
					storeDispatch={dispatch}
					storyIndex={storyIndex}
				/>

				<AdditionalGraphics storeDispatch={dispatch} />

				<AddText storeDispatch={dispatch}>
					{/* <TextPreviewList
						texts={currentStory.texts}
						storyID={currentStory.storyID}
						storyIndex={storyIndex}
						canvasName={currentStory.canvasName}
						shapeName={shapeName}
						storeDispatch={dispatch}
					/> */}

					{textIndex != null && (
						<>
							<TextArea
								textValue={currentStory.texts[textIndex].text}
								storeDispatch={dispatch}
							/>

							<TextProperties
								currentText={currentStory.texts[textIndex]}
								storeDispatch={dispatch}
							/>

							<Fonts
								currentText={currentStory.texts[textIndex]}
								storeDispatch={dispatch}
							/>

							<Colors
								currentText={currentStory.texts[textIndex]}
								storeDispatch={dispatch}
							/>
						</>
					)}
				</AddText>
			</SidebarSections>

			<DownloadFooter storeDispatch={dispatch} />
		</SidebarContainer>
	)
}

export default React.memo(Sidebar)
