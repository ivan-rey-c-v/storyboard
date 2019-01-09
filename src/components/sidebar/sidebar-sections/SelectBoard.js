import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import Select from 'react-select'

import { SidebarSection } from '../Sidebar.styles'

function SelectBoard(props) {
	const { stories, storeDispatch, storyIndex } = props

	const handleSelectStory = useCallback(function(option, action) {
		const { value } = option
		storeDispatch({ type: 'SELECT_STORY_BOARD', storyIndex: value })
	}, [])

	const storiesOption = stories.map((story, index) => {
		return {
			value: index,
			label: `Screen ${index + 1}`
		}
	})

	return (
		<SidebarSection>
			<StyledSelect
				id="select-board"
				value={{
					value: storyIndex,
					label: `Screen ${storyIndex + 1}`
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
