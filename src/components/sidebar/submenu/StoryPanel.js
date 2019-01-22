import React, { useCallback, useRef } from 'react'
import styled from 'styled-components/macro'

import { AnimatedSubMenuPanel, MenuActionDiv } from '../Sidebar.styles'
import FileSVG from 'react-feather/dist/icons/file'
import EditSVG from 'react-feather/dist/icons/edit-3'
import TrashSVG from 'react-feather/dist/icons/trash-2'

function StoryPanel(props) {
	const {
		story,
		isCurrentStoryID,
		handleSelectStory,
		handleDeleteStory,
		handleStoryNameChange
	} = props
	const inputRef = useRef(null)

	const handleEditClick = useCallback(function() {
		inputRef.current.focus()
	}, [])

	return (
		<AnimatedSubMenuPanel onClick={handleSelectStory}>
			<div>
				<FileSVG />
			</div>

			<FlexedDiv>
				<Input
					ref={inputRef}
					value={story.storyName}
					onChange={handleStoryNameChange}
				/>
				<Description isCurrentStoryID={isCurrentStoryID}>
					{isCurrentStoryID ? 'Editing' : story.createdDate}
				</Description>
			</FlexedDiv>

			<MarginedMenuActionDiv onClick={handleDeleteStory}>
				<TrashSVG />
			</MarginedMenuActionDiv>

			<MenuActionDiv onClick={handleEditClick}>
				<EditSVG />
			</MenuActionDiv>
		</AnimatedSubMenuPanel>
	)
}

const FlexedDiv = styled.div`
	flex-grow: 1;
	padding-left: 1.5rem;
	padding-right: 1rem;
`
const MarginedMenuActionDiv = styled(MenuActionDiv)`
	margin-right: 1rem;
`
const Description = styled.p`
	line-height: 1.75;
	font-size: 0.8rem;
	font-weight: 400;
	letter-spacing: 1px;
	${({ isCurrentStoryID }) => {
		return {
			fontWeight: isCurrentStoryID ? '600' : '400',
			color: isCurrentStoryID ? 'var(--color-primary)' : 'gray'
		}
	}};
`
const Input = styled.input`
	width: 100%;
	padding-top: 0.25rem;
	padding-right: 0.25rem;

	border: none;
	font-size: 1rem;
	font-weight: 600;
	color: rgb(62, 56, 71);
	background-color: inherit;

	:focus {
		border: 1px solid lightgray;
		border-radius: 2px;
		padding-left: 0.25rem;
		background-color: white;
	}
`

export default React.memo(StoryPanel)
