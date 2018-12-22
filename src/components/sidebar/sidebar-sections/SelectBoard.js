import React, { useCallback } from 'react'

import { SidebarSection, Select, HiddenEl } from '../Sidebar.styles'

function SelectBoard(props) {
	console.log('select-board...')
	const { stories, currentStoryName, storeDispatch } = props

	const handleSelectStory = useCallback(function(event) {
		event.stopPropagation()
		const { value } = event.target
		storeDispatch({ type: 'SELECT_STORY_BOARD', storyIndex: value })
	}, [])

	return (
		<SidebarSection>
			<HiddenEl as="label" htmlFor="select-board">
				Select Board
			</HiddenEl>
			<Select
				id="select-board"
				value={currentStoryName}
				onChange={handleSelectStory}
			>
				{stories.map(({ storyID, canvasName }, index) => (
					<option key={storyID} value={index}>
						{storyID}
					</option>
				))}
			</Select>
		</SidebarSection>
	)
}

export default React.memo(SelectBoard)
