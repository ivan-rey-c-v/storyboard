import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useContext
} from 'react'
import { AppContext } from '../../store/AppContext'
// Konva is needed for react-konva as dependency
import { Stage, Layer, Text, Transformer } from 'react-konva'
import BackgroundImage from './BackgroundImage'

function Canvas(props) {
	const transformerRef = useRef(null)
	const [image, setImage] = useState(null)
	const [imageSize, setImageSize] = useState(null)
	const store = useContext(AppContext)
	const { selectedShapeName } = store.state

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
						height: props.height,
						width: props.height * aspectRatio
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

	const handleStageMouseDown = useCallback(function(e) {
		const { name } = e.target.attrs
		// clicked on <Stage /> or <BackgroundImage /> - clear selection
		if (name === 'canvas-stage' || name === 'background-image') {
			transformerRef.current.detach()
			// re-draw
			transformerRef.current.getLayer().batchDraw()
			// only one active object globally
			store.dispatch({ type: 'SET_SELECTED_SHAPE_NAME', name: '' })
			return
		}

		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer || name === selectedShapeName) {
			return // do nothing if it is transformer or current shape
		}

		transformerRef.current.detach()
		// attach transfer to new shape - e.target node
		transformerRef.current.attachTo(e.target)
		store.dispatch({ type: 'SET_SELECTED_SHAPE_NAME', name })
	}, [])

	const handleOnTextDrag = useCallback(function(pos) {
		const scaleX = this.scaleX()
		//	const scaleY = this.scaleY()
		const width = this.width()
		const height = this.height()

		const limit = 0.5
		const axisXLimit = width * scaleX * limit
		const leftBoundary = -axisXLimit
		const rightBoundary = props.width - axisXLimit

		const axisYLimit = height * scaleX * limit
		const topBoundary = -axisYLimit
		const bottomBoundary = props.height - axisYLimit

		// The new coordinate (x',y') is a result of the standard rotation formula:

		// y' = y*cos(a) - x*sin(a)
		// x' = y*sin(a) + x*cos(a)

		// where a is the angle of a clockwise rotation.
		// This assumes the (x,y) is given with respect to the center of rotation.
		// In other words, (0,0) is the center of rotation.

		return {
			x:
				pos.x < leftBoundary
					? leftBoundary
					: pos.x > rightBoundary
					? rightBoundary
					: pos.x,
			y:
				pos.y < topBoundary
					? topBoundary
					: pos.y > bottomBoundary
					? bottomBoundary
					: pos.y
		}
	}, [])

	return (
		<Stage
			name="canvas-stage"
			height={props.height}
			width={props.width}
			onMouseDown={handleStageMouseDown}
		>
			<Layer>
				{image && (
					<BackgroundImage
						image={image}
						name="background-image"
						containerWidth={props.width}
						// height and width
						{...imageSize}
					/>
				)}

				{props.texts.map((text, index) => (
					<Text
						key={`text-${index}`}
						name={`text-${index}`}
						text={text.value}
						draggable
						x={20}
						y={index * 20}
						fontSize={text.fontSize}
						dragBoundFunc={handleOnTextDrag}
					/>
				))}
				<Transformer ref={transformerRef} name="my-transformer" />
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)
