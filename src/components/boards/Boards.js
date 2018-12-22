import React, { useContext, useCallback } from 'react'
import { AppContext } from '../../store/AppContext'
import styled from 'styled-components'

import StoryBoard from './StoryBoard'
import AddBoard from './AddBoard'

import useCanvasSizeFromWindowHeight from '../../hooks/useCanvasSizeFromWindowHeight'

function MainSection(props) {
	console.log('rendering main-section...')

	const { state, dispatch } = useContext(AppContext)
	const { stories } = state
	const { storyIndex, shapeName } = state.active
	const { canvasHeight, canvasWidth } = useCanvasSizeFromWindowHeight()

	return (
		<MainLayout>
			{stories.map((story, index) => (
				<StoryBoard
					key={story.canvasName}
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
					story={story}
					storeDispatch={dispatch}
					//
					shapeName={shapeName}
					index={index}
					// currentStoryIndex={currentStoryIndex}
					// isCurrentStory={currentStoryIndex === index ? true : false}
				/>
			))}

			{stories.length < 3 && (
				<AddBoard
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
				/>
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
`

export default React.memo(MainSection)
