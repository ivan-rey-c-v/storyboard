import React, { useState, useEffect, useCallback, useRef } from 'react'
// Konva is needed for react-konva
import Konva from 'konva'
import { Stage, Layer, Image, Text, Transformer } from 'react-konva'

function Canvas(props) {
	const transformerRef = useRef(null)
	const [image, setImage] = useState(null)
	const [selectedShapeName, setSelectedShapeName] = useState('')

	useEffect(
		function() {
			if (props.backgroundImg) {
				const newImage = new window.Image()
				newImage.src = window.URL.createObjectURL(props.backgroundImg)
				newImage.onload = () => {
					// render konva Image when ready
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

	const dragOnHorizontally = useCallback(function(pos) {
		return {
			x: pos.x,
			y: this.getAbsolutePosition().y
		}
	}, [])

	const handleStageMouseDown = useCallback(function(e) {
		const { name } = e.target.attrs
		// clicked on <Stage /> or <BackgroundImage /> - clear selection
		if (name === 'canvas-stage' || name === 'background-image') {
			transformerRef.current.detach()
			// re-draw
			transformerRef.current.getLayer().batchDraw()
			setSelectedShapeName('')
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
		setSelectedShapeName(name)
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
					<Image
						image={image}
						name={'background-image'}
						draggable
						height={props.height}
						dragBoundFunc={dragOnHorizontally}
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
					/>
				))}
				<Transformer ref={transformerRef} />
			</Layer>
		</Stage>
	)
}

export default React.memo(Canvas)
