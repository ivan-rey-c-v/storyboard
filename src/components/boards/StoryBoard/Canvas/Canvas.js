import React, { useEffect, useState, useCallback } from 'react'
import { Stage, Layer } from 'react-konva'

import BackgroundImage from './BackgroundImage'
import ColoredBox from './ColoredBox'
import FittedImage from './FittedImage'
import ShapeTransformer from './ShapeTransformer'
import TextGroup from './TextGroup'
import Emoji from './Emoji'

function Canvas(props) {
	const {
		boardID,
		board,
		activeTextShapeID,
		canvasHeight,
		canvasWidth,
		storeDispatch
	} = props
	const { backgroundImage, shapesList, shapesByID } = board
	const [canvasBackgroundImage, setCanvasBackgroundImage] = useState(null)
	const [imageSize, setImageSize] = useState()
	const [withCenterAnchors, setWithCenterAnchors] = useState(true)

	useEffect(
		function() {
			if (backgroundImage.file) {
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

	const onStageMouseDown = useCallback(
		function(e) {
			const { name } = e.target.attrs

			// clicked on <Stage /> or <BackgroundImage /> - clear selection
			if (name === 'canvas-stage' || name === 'background-image') {
				storeDispatch({
					type: 'SET_ACTIVE_SHAPE_NAME',
					name: null,
					storyIndex: boardID
				})
				return
			}

			const clickedOnTransformer =
				e.target.getParent().className === 'Transformer'
			if (clickedOnTransformer || name === activeTextShapeID) {
				return // do nothing if it is transformer or current shape
			}

			if (name.includes('object') || name.includes('emoji')) {
				setWithCenterAnchors(false)
				storeDispatch({
					type: 'SET_ACTIVE_SHAPE_NAME',
					name,
					storyIndex: boardID
				})
				return
			}

			if (name.includes('text')) {
				setWithCenterAnchors(true)
				storeDispatch({
					name: name.includes('group') ? name : `${name}-group`,
					type: 'SET_ACTIVE_SHAPE_NAME',
					storyIndex: boardID
				})
				return
			}
		},
		[boardID]
	)

	const onDragKonvaShape = useCallback(
		shapeID =>
			function(pos) {
				const scaleX = this.scaleX()
				const width = this.width()
				const height = this.height()

				const limit = 0.5
				const axisXLimit = width * scaleX * limit
				const leftBoundary = -axisXLimit
				const rightBoundary = props.canvasWidth - axisXLimit

				const axisYLimit = height * scaleX * limit
				const topBoundary = -axisYLimit
				const bottomBoundary = props.canvasHeight - axisYLimit

				// The new coordinate (x',y') is a result of the standard rotation formula:

				// y' = y*cos(a) - x*sin(a)
				// x' = y*sin(a) + x*cos(a)

				// where a is the angle of a clockwise rotation.
				// This assumes the (x,y) is given with respect to the center of rotation.
				// In other words, (0,0) is the center of rotation.

				const newPosX =
					pos.x < leftBoundary
						? leftBoundary
						: pos.x > rightBoundary
						? rightBoundary
						: pos.x

				const newPosY =
					pos.y < topBoundary
						? topBoundary
						: pos.y > bottomBoundary
						? bottomBoundary
						: pos.y

				storeDispatch({
					type: 'SET_SHAPE_COORD',
					shapeID,
					coord: {
						x: newPosX,
						y: newPosY
					}
				})

				return {
					x: newPosX,
					y: newPosY
				}
			},
		[]
	)

	const handleOnTransform = useCallback(function() {
		storeDispatch({
			type: 'SET_SHAPE_COORD',
			shapeID: this.name(),
			coord: {
				x: this.x(),
				y: this.y(),
				scaleX: this.scaleX(),
				scaleY: this.scaleY(),
				rotation: this.rotation()
			}
		})
	}, [])

	return (
		<Stage
			name="canvas-stage"
			height={canvasHeight}
			width={canvasWidth}
			onMouseDown={onStageMouseDown}
		>
			<Layer>
				{canvasBackgroundImage && (
					<BackgroundImage
						image={canvasBackgroundImage}
						name="background-image"
						type={backgroundImage.type}
						canvasWidth={props.canvasWidth}
						x={backgroundImage.x}
						height={imageSize.height}
						width={imageSize.width}
						originalHeight={imageSize.originalHeight}
						originalWidth={imageSize.originalWidth}
						storeDispatch={storeDispatch}
						storyIndex={boardID}
					/>
				)}

				{backgroundImage.colorType !== 'blur' && (
					<ColoredBox
						name="background-image"
						width={props.canvasWidth}
						height={props.canvasHeight}
						fill={backgroundImage.colorFill}
					/>
				)}
				{canvasBackgroundImage && backgroundImage.type === 'fit' ? (
					<FittedImage
						image={canvasBackgroundImage}
						name="background-image"
						canvasWidth={props.canvasWidth}
						canvasHeight={props.canvasHeight}
						originalHeight={imageSize.originalHeight}
						originalWidth={imageSize.originalWidth}
					/>
				) : null}

				{shapesList.map((shapeID, index) => {
					const shape = shapesByID[shapeID]

					if (shape.type === 'text') {
						return (
							<TextGroup
								key={shape.id}
								textGroup={shape}
								boardID={boardID}
								onDragKonvaShape={onDragKonvaShape(shape.id)}
								onTransform={handleOnTransform}
							/>
						)
					}

					if (shape.type === 'emoji') {
						return (
							<Emoji
								key={shape.id}
								{...shape}
								name={shape.id}
								text={shape.emoji}
								draggable
								x={shape.coord.x}
								y={shape.coord.y}
								scaleX={shape.coord.scaleX}
								scaleY={shape.coord.scaleY}
								rotation={shape.coord.rotation}
								dragBoundFunc={onDragKonvaShape(shape.id)}
								onTransform={handleOnTransform}
							/>
						)
					}

					return null
				})}

				<ShapeTransformer
					activeTextShapeID={activeTextShapeID}
					withCenterAnchors={withCenterAnchors}
					//shapes={story.shapes}
				/>
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)