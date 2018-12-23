import React, { useEffect, useState, useCallback } from 'react'
import { Stage, Layer, Text, Label, Tag } from 'react-konva'

import BackgroundImage from './BackgroundImage'
import ShapeTransformer from './ShapeTransformer'

function Canvas(props) {
	const { canvasHeight, canvasWidth, story, shapeName, storeDispatch } = props
	const { backgroundImage, texts, emojies, canvasName } = story
	const [canvasBackgroundImage, setCanvasBackgroundImage] = useState(null)
	const [imageSize, setImageSize] = useState(null)
	const [withCenterAnchors, setWithCenterAnchors] = useState(true)

	useEffect(
		function() {
			if (backgroundImage) {
				const newImage = new window.Image()
				newImage.src = window.URL.createObjectURL(backgroundImage)
				newImage.onload = () => {
					// render konva Image when ready
					const { height, width } = newImage
					const aspectRatio = width / height

					setImageSize({
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
		[backgroundImage]
	)

	const onStageMouseDown = useCallback(function(e) {
		const { name, textIndex } = e.target.attrs
		console.log({ name })
		// clicked on <Stage /> or <BackgroundImage /> - clear selection
		if (name === 'canvas-stage' || name === 'background-image') {
			storeDispatch({ type: 'SET_ACTIVE_SHAPE_NAME', name: '' })
			return
		}

		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer || name === shapeName) {
			return // do nothing if it is transformer or current shape
		}

		if (name.includes('object') || name.includes('emoji')) {
			setWithCenterAnchors(false)
			storeDispatch({ type: 'SET_ACTIVE_SHAPE_NAME', name, textIndex })
			return
		}

		if (name.includes('text')) {
			setWithCenterAnchors(true)
			storeDispatch({
				name: name.includes('label') ? name : `${name}-label`,
				type: 'SET_ACTIVE_SHAPE_NAME',
				textIndex
			})
			return
		}
	}, [])

	const onDragKonvaShape = useCallback(function(pos) {
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

		return {
			x: newPosX,
			y: newPosY
		}
	}, [])

	// const onTransform = useCallback(function(oldBox, newBox) {
	// 	storeDispatch({ type: 'MODIFY_TEXT', properties: newBox })
	// 	return newBox
	// }, [])

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
						canvasWidth={props.canvasWidth}
						height={imageSize.height}
						width={imageSize.width}
					/>
				)}

				{texts.map((text, index) => {
					const { x, y, rotation, ...textProperties } = text

					return (
						<Label
							key={`text-${index}`}
							height={text.height}
							width={text.width}
							alpha={100}
							draggable
							name={`${canvasName}-text-${index}-label`}
							dragBoundFunc={onDragKonvaShape}
							x={canvasWidth / 2 - 50}
							y={index * 70 + 10}
						>
							<Tag
								fill={text.boxFill}
								alpha={text.boxOpacity * 100}
								height={text.height}
								width={text.width}
							/>
							<Text
								textIndex={index}
								{...textProperties}
								alpha={text.opacity * 100}
								stroke={text.isBold ? text.fill : 'transparent'}
								strokeWidth={1.25}
								fontStyle={text.isItalic ? 'italic' : 'normal'}
								name={`${canvasName}-text-${index}`}
							/>
						</Label>
					)
				})}

				{emojies.map((object, index) => (
					<Text
						key={`emoji-${index}`}
						{...object}
						name={`${canvasName}-emoji-${index}`}
						text={object.emoji}
						textIndex={null}
						draggable
						x={canvasWidth / 2 - 70}
						y={100}
						dragBoundFunc={onDragKonvaShape}
					/>
				))}

				<ShapeTransformer
					shapeName={shapeName}
					withCenterAnchors={withCenterAnchors}
					// onTransform={onTransform}
				/>
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)
