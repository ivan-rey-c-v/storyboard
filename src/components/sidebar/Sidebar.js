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
import TextPreviewList from './sidebar-sections/text-properties/TextPreviewList'
import TextInput from './sidebar-sections/text-properties/TextInput'
import TextProperties from './sidebar-sections/text-properties/TextProperties'
import FontAndColor from './sidebar-sections/text-properties/FontAndColor'

function Sidebar(props) {
	const { state, dispatch } = props
	const { stories } = state
	const { storyIndex, textIndex, shapeName } = state.active

	const currentStory = stories[storyIndex]

	console.log({ storyIndex, currentStory })

	console.log('rendering side-bar...')

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
					storyIndex={storyIndex}
				/>

				<AdditionalGraphics storeDispatch={dispatch} />

				<AddText storeDispatch={dispatch}>
					<TextPreviewList
						texts={currentStory.texts}
						storyID={currentStory.storyID}
						canvasName={currentStory.canvasName}
						shapeName={shapeName}
						storeDispatch={dispatch}
					/>

					{textIndex != null && (
						<>
							<TextInput
								textValue={currentStory.texts[textIndex].text}
								storeDispatch={dispatch}
							/>

							<TextProperties
								currentText={currentStory.texts[textIndex]}
								storeDispatch={dispatch}
							/>

							<FontAndColor
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
