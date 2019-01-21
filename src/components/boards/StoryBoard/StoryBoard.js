import React, { lazy, Suspense, useCallback, useState } from 'react'
import styled, { css } from 'styled-components/macro'

import BoardHeader from './BoardHeader'
import BoardFooter from './BoardFooter'

const Canvas = lazy(_ => import('./Canvas/Canvas'))

function StoryBoard(props) {
	const {
		boardID,
		board,
		canMoveLeft,
		canMoveRight,
		activeTextShapeID,
		isActiveBoard,
		canvasHeight,
		canvasWidth,
		storeDispatch
	} = props
	// isDragging is used for css
	const [isDragging, setIsDragging] = useState(false)

	const handleMoveBoard = useCallback(
		(increment, boardID) => event => {
			event.stopPropagation()
			storeDispatch({ type: 'MOVE_STORY_BOARD', boardID, increment })
		},
		[]
	)

	const handleSelectBoard = useCallback(
		function(event) {
			event.stopPropagation()
			storeDispatch({
				type: 'SELECT_STORY_BOARD',
				storyIndex: boardID
			})
		},
		[boardID]
	)

	const handleDeleteBoard = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'DELETE_STORY_BOARD', storyID: 'story id' })
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
				storyIndex: boardID
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
				isActiveBoard={isActiveBoard}
				boardID={boardID}
				handleDeleteBoard={handleDeleteBoard}
				canMoveLeft={canMoveLeft}
				canMoveRight={canMoveRight}
				handleMoveBoard={handleMoveBoard}
			/>

			<CanvasContainer
				isdragging={isDragging}
				isActiveBoard={isActiveBoard}
				canvasHeight={canvasHeight}
				onClick={handleSelectBoard}
				onDrop={handleOnImageDrop}
				onDragOver={handleOnDragOver}
				onDragLeave={handleOnDragLeave}
			>
				<Suspense fallback={<EmptyDiv />}>
					<Canvas
						// canvasHeight/Width, story, activeTextShapeID, storeDispatch
						{...props}
					/>
				</Suspense>
			</CanvasContainer>

			<BoardFooter
				activeTextShapeID={activeTextShapeID}
				isActiveBoard={isActiveBoard}
				storeDispatch={storeDispatch}
				boardID={boardID}
			/>
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
		props.isActiveBoard
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
