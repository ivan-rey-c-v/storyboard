import React, { useCallback } from 'react'
import styled from 'styled-components/macro'

import { SidebarSections, AnimatedSubMenuPanel } from '../Sidebar.styles'
import PlusSVG from 'react-feather/dist/icons/plus'
import StoryPanel from './StoryPanel'

function SubMenu(props) {
	const { storiesList, storiesByID, activeStoryID, storeDispatch } = props

	const handleAddStory = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'ADD_STORY' })
	}, [])

	const handleSelectStory = useCallback(
		storyID => event => {
			event.stopPropagation()
			event.preventDefault()
			storeDispatch({ type: 'SELECT_STORY', storyID })
		},
		[]
	)

	const handleDeleteStory = useCallback(
		storyID => event => {
			event.stopPropagation()
			event.preventDefault()
			storeDispatch({ type: 'DELETE_STORY', storyID })
		},
		[]
	)

	const handleStoryNameChange = useCallback(
		storyID => event => {
			event.stopPropagation()
			event.preventDefault()
			storeDispatch({
				type: 'CHANGE_STORY_NAME',
				storyID,
				storyName: event.target.value
			})
		},
		[]
	)

	return (
		<StyledSidebarSections>
			<CreateStoryPanel onClick={handleAddStory} delayIndex={0}>
				<div>
					<PlusSVG />
				</div>
				<FlexedDiv>Create New Story</FlexedDiv>
				<div />
			</CreateStoryPanel>

			<StoriesDiv>
				<OverflowDiv>
					{storiesList.map((storyID, index) => {
						const story = storiesByID[storyID]
						const isCurrentStoryID = storyID === activeStoryID
						return (
							<StoryPanel
								key={storyID}
								story={story}
								index={index}
								isCurrentStoryID={isCurrentStoryID}
								handleSelectStory={handleSelectStory(storyID)}
								handleDeleteStory={handleDeleteStory(storyID)}
								handleStoryNameChange={handleStoryNameChange(
									storyID
								)}
							/>
						)
					})}
				</OverflowDiv>
			</StoriesDiv>
		</StyledSidebarSections>
	)
}

const StyledSidebarSections = styled(SidebarSections)`
	flex-grow: 1;
	overflow: hidden;
`
const CreateStoryPanel = styled(AnimatedSubMenuPanel)`
	border-top: 1px solid lightgray;
	--color-hover: lightblue;

	:active {
		transform: scale(0.95);
	}
`
const FlexedDiv = styled.div`
	flex-grow: 1;
	padding-left: 1.5rem;
	font-size: 1rem;
	font-weight: 600;
	color: rgb(62, 56, 71);
`
const StoriesDiv = styled.div`
	/* height - (total height if two submenu panels) */
	height: calc(100vh - 160px);
	position: relative;
`
const OverflowDiv = styled.div`
	max-height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-y: auto;
`

export default React.memo(SubMenu)
