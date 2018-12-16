import React, { useContext, useCallback } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import StoryBoard from './StoryBoard'
import { ReactComponent as PlusSVG } from '../../icons/plus.svg'

function MainSection(props) {
	const { state, dispatch } = useContext(AppContext)
	const { stories, currentStoryIndex } = state

	const handleAddStoryBoard = useCallback(function(event) {
		event.stopPropagation()
		dispatch({ type: 'ADD_STORY_BOARD' })
	}, [])

	return (
		<MainLayout>
			{stories.map((story, index) => (
				<StoryBoard
					key={story.canvasName}
					{...story}
					storeDispatch={dispatch}
					index={index}
					isCurrentStory={currentStoryIndex === index ? true : false}
				/>
			))}

			{stories.length < 3 && (
				<div className="add-board">
					<div className="button-div" onClick={handleAddStoryBoard}>
						<PlusSVG />
					</div>
					<span className="description">
						<p>Add story board</p>
					</span>
				</div>
			)}
		</MainLayout>
	)
}

const MainLayout = styled.main`
	flex: 1;
	background-color: #f7f7f7;
	padding-top: 1rem;
	padding-left: 4rem;
	overflow: hidden;

	display: flex;
	align-items: center;

	> .add-board {
		margin-left: 7rem;
		display: flex;
		flex-direction: column;
		align-items: center;

		> .button-div {
			margin: 1rem;
			height: 5rem;
			width: 5rem;
			border: 1px solid darkgray;
			border-radius: 4px;
			cursor: pointer;
			fill: darkgray;

			> svg {
				height: 100%;
				width: 100%;
			}

			:hover {
				fill: #8d7993;
			}
			:active {
				transform: scale(0.97);
			}
		}

		> .description {
			color: gray;
		}
	}
`

export default React.memo(MainSection)
