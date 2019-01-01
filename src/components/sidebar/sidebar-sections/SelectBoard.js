import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

import { SidebarSection, HiddenEl } from '../Sidebar.styles'

function SelectBoard(props) {
	const { stories, storeDispatch, storyIndex, currentStoryID } = props

	const handleSelectStory = useCallback(function(option, action) {
		const { value } = option
		storeDispatch({ type: 'SELECT_STORY_BOARD', storyIndex: value })
	}, [])

	const storiesOption = stories.map((story, index) => {
		return {
			value: index,
			label: story.storyID
		}
	})

	console.log({ storyIndex, currentStoryID })

	return (
		<SidebarSection>
			<StyledSelect
				id="select-board"
				value={{
					value: storyIndex,
					label: currentStoryID
				}}
				onChange={handleSelectStory}
				options={storiesOption}
			/>
		</SidebarSection>
	)
}

const StyledSelect = styled(Select)`
	> div {
		border-color: gray;
		color: rgb(62, 56, 71) !important;
		font-weight: 600;
	}
`

export default React.memo(SelectBoard)
