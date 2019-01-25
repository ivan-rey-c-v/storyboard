import React, { useCallback, useState } from 'react'
import BackgroundImage from './BackgroundImage'
import ColoredBox from './ColoredBox'
import FittedImage from './FittedImage'
import KonvaStage from './KonvaStage'
import ShapesList from './ShapesList'
import ShapeTransformer from './ShapeTransformer'

function Canvas(props) {
	const {
		boardID,
		board,
		activeTextShapeID,
		canvasHeight,
		canvasWidth,
		storeDispatch,
		imageSize,
		canvasBackgroundImage
	} = props
	const { backgroundImage, shapesList, shapesByID } = board
	const [withCenterAnchors, setWithCenterAnchors] = useState(true)

	const onStageMouseDown = useCallback(function(e) {
		const { name } = e.target.attrs

		// clicked on <Stage /> or <BackgroundImage /> - clear selection
		if (name === 'canvas-stage' || name === 'background-image') {
			storeDispatch({
				type: 'SET_ACTIVE_SHAPE_ID',
				shapeID: null
			})
			return
		}

		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer) {
			return // do nothing if it is transformer
		}

		const isTextGroup = name.includes('text')

		setWithCenterAnchors(isTextGroup ? true : false)

		storeDispatch({
			type: 'SET_ACTIVE_SHAPE_ID',
			shapeID: isTextGroup ? name.replace('-group', '') : name
		})
		return
	}, [])

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
					boardID,
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
		const name = this.name()
		const shapeID = name.includes('group')
			? name.replace('-group', '')
			: name

		storeDispatch({
			type: 'SET_SHAPE_COORD',
			boardID,
			shapeID,
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
		<KonvaStage
			name="canvas-stage"
			boardID={boardID}
			height={canvasHeight}
			width={canvasWidth}
			onMouseDown={onStageMouseDown}
		>
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
					boardID={boardID}
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

			<ShapesList
				boardID={boardID}
				shapesList={shapesList}
				shapesByID={shapesByID}
				onDragKonvaShape={onDragKonvaShape}
				handleOnTransform={handleOnTransform}
			/>

			<ShapeTransformer
				activeTextShapeID={activeTextShapeID}
				withCenterAnchors={withCenterAnchors}
				//board={board}
			/>
		</KonvaStage>
	)
}

export default React.memo(Canvas)
