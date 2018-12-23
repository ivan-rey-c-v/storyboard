import React, { lazy, Suspense, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'

import BoardHeader from './BoardHeader'

const Canvas = lazy(_ => import('./Canvas'))

function StoryBoard(props) {
	const { canvasHeight, canvasWidth, isCurrentStory, story } = props

	const preventPropagation = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
	}, [])

	return (
		<Container canvasWidth={canvasWidth}>
			<BoardHeader
				isCurrentStory={isCurrentStory}
				storyID={story.storyID}
			/>

			<CanvasContainer
				isCurrentStory={isCurrentStory}
				canvasHeight={canvasHeight}
				onClick={preventPropagation}
			>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						// canvasHeight/Width, story, shapeName, storeDispatch
						{...props}
					/>
				</Suspense>
			</CanvasContainer>
		</Container>
	)
}

const Container = styled.div`
	width: ${props => `${props.canvasWidth}px`};

	margin-left: 2rem;
	display: flex;
	flex-direction: column;
`
const CanvasContainer = styled.div`
	height: ${props => `${props.canvasHeight}px`};

	cursor: pointer;
	width: 100%;
	border: 1px solid lightgray;

	${props =>
		props.isCurrentStory
			? css`
					border: 2px solid rebeccapurple;
					box-shadow: 2px 2px 8px gray;
			  `
			: null}
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
