import React, { lazy, Suspense, useCallback, useState } from 'react'
import styled, { css } from 'styled-components/macro'

import BoardHeader from './BoardHeader'
import BoardFooter from './BoardFooter'

const Canvas = lazy(_ => import('./Canvas'))

function StoryBoard(props) {
	const {
		canvasHeight,
		canvasWidth,
		isCurrentStory,
		story,
		storeDispatch,
		boardIndex,
		textIndex,
		storiesLength
	} = props
	// isDragging is used for css
	const [isDragging, setIsDragging] = useState(false)

	const handleMoveBoard = useCallback(
		(increment, boardIndex) => event => {
			event.stopPropagation()
			storeDispatch({ type: 'MOVE_STORY_BOARD', boardIndex, increment })
		},
		[]
	)

	const handleSelectBoard = useCallback(
		function(event) {
			event.stopPropagation()
			storeDispatch({
				type: 'SELECT_STORY_BOARD',
				storyIndex: boardIndex
			})
		},
		[boardIndex]
	)

	const handleDeleteBoard = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'DELETE_STORY_BOARD', storyID: story.storyID })
	}, [])

	const handleOnImageDrop = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		setIsDragging(false)

		const data = event.dataTransfer
		const file = data.files[0]

		if (file.type.includes('image')) {
			storeDispatch({
				type: 'SET_BACKGROUND_IMAGE',
				imgFile: file,
				storyIndex: boardIndex
			})
		}
	}, [])

	const handleOnDragLeave = useCallback(function(event) {
		setIsDragging(false)
	}, [])
	const handleOnDragOver = useCallback(function(event) {
		setIsDragging(true)
	}, [])

	return (
		<Container canvasWidth={canvasWidth}>
			<BoardHeader
				isCurrentStory={isCurrentStory}
				boardIndex={boardIndex}
				handleDeleteBoard={handleDeleteBoard}
				canMoveLeft={boardIndex === 0 ? false : true}
				canMoveRight={boardIndex + 1 === storiesLength ? false : true}
				handleMoveBoard={handleMoveBoard}
			/>

			<CanvasContainer
				isdragging={isDragging}
				isCurrentStory={isCurrentStory}
				canvasHeight={canvasHeight}
				onClick={handleSelectBoard}
				onDrop={handleOnImageDrop}
				onDragOver={handleOnDragOver}
				onDragLeave={handleOnDragLeave}
			>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						// canvasHeight/Width, story, shapeName, storeDispatch
						{...props}
					/>
				</Suspense>
			</CanvasContainer>

			<BoardFooter textIndex={textIndex} />
		</Container>
	)
}

const Container = styled.div`
	width: ${props => `${props.canvasWidth}px`};

	margin-left: 3rem;
	display: flex;
	flex-direction: column;
`
const CanvasContainer = styled.div`
	height: ${props => `${props.canvasHeight}px`};

	cursor: pointer;
	width: 100%;
	outline: 1px solid lightgray;

	${props =>
		props.isCurrentStory
			? css`
					outline: 1px solid var(--color-primary);
					box-shadow: 2px 2px 8px gray;
			  `
			: null};

	transition: transform 100ms ease-in-out;
	transform: ${props => (props.isdragging ? 'scale(1.015)' : 'none')};
`
const EmptyDiv = styled.div`
	height: 100%;
	width: 100%;
`

export default React.memo(StoryBoard)
