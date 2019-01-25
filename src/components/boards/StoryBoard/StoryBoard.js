import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import BoardFooter from './BoardFooter'
import BoardHeader from './BoardHeader'

const Canvas = lazy(_ => import('./Canvas/Canvas'))

function StoryBoard(props) {
	const {
		board,
		boardID,
		boardIndex,
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
	const [imageSize, setImageSize] = useState()
	const [canvasBackgroundImage, setCanvasBackgroundImage] = useState(null)

	const { backgroundImage } = board

	useEffect(
		function() {
			if (backgroundImage.file && backgroundImage.file.dataURL) {
				const newImage = new window.Image()
				newImage.src = backgroundImage.file.dataURL
				newImage.onload = () => {
					// render konva Image when ready
					const { height, width } = newImage
					const aspectRatio = width / height

					setImageSize({
						originalHeight: height,
						originalWidth: width,
						height: canvasHeight,
						width: canvasHeight * aspectRatio
					})
					setCanvasBackgroundImage(newImage)
				}
			} else {
				// dont render konva Image
				setCanvasBackgroundImage(null)
			}
		},
		// called everytime backgroundImage changes
		[backgroundImage.file]
	)

	const handleMoveBoard = useCallback(
		increment => event => {
			event.stopPropagation()
			storeDispatch({ type: 'MOVE_STORY_BOARD', boardIndex, increment })
		},
		[boardIndex]
	)

	const handleSelectBoard = useCallback(
		function(event) {
			event.stopPropagation()
			storeDispatch({
				type: 'SELECT_STORY_BOARD',
				boardID
			})
		},
		[boardID]
	)

	const handleDeleteBoard = useCallback(function(event) {
		event.stopPropagation()
		storeDispatch({ type: 'DELETE_STORY_BOARD', boardID })
	}, [])

	const handleOnImageDrop = useCallback(function(event) {
		event.stopPropagation()
		event.preventDefault()
		setIsDragging(false)

		const data = event.dataTransfer
		const file = data.files[0]

		if (file.type.includes('image')) {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = function(event) {
				storeDispatch({
					type: 'SET_BACKGROUND_IMAGE',
					properties: {
						file: {
							dataURL: reader.result,
							name: file.name
						},
						x: 0
					}
				})
			}
		}
	}, [])

	const handleOnDragLeave = useCallback(function(event) {
		setIsDragging(false)
	}, [])
	const handleOnDragOver = useCallback(function(event) {
		setIsDragging(true)
	}, [])

	useEffect(
		function() {
			if (backgroundImage.file && backgroundImage.file.dataURL) {
				const newImage = new window.Image()
				newImage.src = backgroundImage.file.dataURL
				newImage.onload = () => {
					// render konva Image when ready
					const { height, width } = newImage
					const aspectRatio = width / height

					setImageSize({
						originalHeight: height,
						originalWidth: width,
						height: canvasHeight,
						width: canvasHeight * aspectRatio
					})
					setCanvasBackgroundImage(newImage)
				}
			} else {
				// dont render konva Image
				setCanvasBackgroundImage(null)
			}
		},
		// called everytime backgroundImage changes
		[backgroundImage.file]
	)

	return (
		<Container canvasWidth={canvasWidth}>
			<BoardHeader
				isActiveBoard={isActiveBoard}
				boardID={boardID}
				boardIndex={boardIndex}
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
						imageSize={imageSize}
						canvasBackgroundImage={canvasBackgroundImage}
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
