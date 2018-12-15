import React, { useState, useEffect, useCallback, useContext } from 'react'
import { AppContext } from '../../store/AppContext'
// Konva is needed for react-konva as dependency
import { Stage, Layer, Text, Label, Tag } from 'react-konva'

import BackgroundImage from './BackgroundImage'
import ShapeTransformer from './ShapeTransformer'

function Canvas(props) {
	const [image, setImage] = useState(null)
	const [imageSize, setImageSize] = useState(null)
	const [withCenterAnchors, setWithCenterAnchors] = useState(true)

	const {
		state: {
			actives: { selectedShapeName }
		},
		dispatch
	} = useContext(AppContext)

	useEffect(
		function() {
			if (props.backgroundImg) {
				const newImage = new window.Image()
				newImage.src = window.URL.createObjectURL(props.backgroundImg)
				newImage.onload = () => {
					// render konva Image when ready
					const { height, width } = newImage
					const aspectRatio = width / height

					setImageSize({
						height: props.canvasHeight,
						width: props.canvasHeight * aspectRatio
					})
					setImage(newImage)
				}
			} else {
				// dont render konva Image
				setImage(null)
			}
		},
		// called everytime props.backgroundImg changes
		[props.backgroundImg]
	)

	const onStageMouseDown = useCallback(function(e) {
		const { name, textIndex } = e.target.attrs

		// clicked on <Stage /> or <BackgroundImage /> - clear selection
		if (name === 'canvas-stage' || name === 'background-image') {
			dispatch({ type: 'SET_SELECTED_SHAPE_NAME', name: '' })
			return
		}

		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer || name === selectedShapeName) {
			return // do nothing if it is transformer or current shape
		}

		if (name.includes('object') || name.includes('emoji')) {
			setWithCenterAnchors(false)
			dispatch({ type: 'SET_SELECTED_SHAPE_NAME', name, textIndex })
			return
		}

		if (name.includes('text')) {
			setWithCenterAnchors(true)
			dispatch({
				name: name.includes('label') ? name : `${name}-label`,
				type: 'SET_SELECTED_SHAPE_NAME',
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

	const onTransform = useCallback(function(oldBox, newBox) {
		dispatch({ type: 'MODIFY_TEXT', properties: newBox })
		return newBox
	}, [])

	return (
		<Stage
			name="canvas-stage"
			height={props.canvasHeight}
			width={props.canvasWidth}
			onMouseDown={onStageMouseDown}
		>
			<Layer>
				{image && (
					<BackgroundImage
						image={image}
						name="background-image"
						canvasWidth={props.canvasWidth}
						// height and width
						{...imageSize}
					/>
				)}

				{props.texts.map((text, index) => {
					const { x, y, rotation, ...textProperties } = text

					return (
						<Label
							key={`text-${index}`}
							height={text.height}
							width={text.width}
							alpha={100}
							draggable
							name={`${props.canvasName}-text-${index}-label`}
							dragBoundFunc={onDragKonvaShape}
							x={props.canvasWidth / 2 - 50}
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
								name={`${props.canvasName}-text-${index}`}
							/>
						</Label>
					)
				})}

				{props.emojies.map((object, index) => (
					<Text
						key={`emoji-${index}`}
						{...object}
						name={`${props.canvasName}-emoji-${index}`}
						text={object.emoji}
						textIndex={null}
						draggable
						x={props.width / 2 - 70}
						y={100}
						dragBoundFunc={onDragKonvaShape}
					/>
				))}

				<ShapeTransformer
					selectedShapeName={selectedShapeName}
					withCenterAnchors={withCenterAnchors}
					onTransform={onTransform}
				/>
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)
