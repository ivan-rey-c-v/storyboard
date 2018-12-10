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

	useEffect(
		function() {
			if (selectedShapeName && transformerRef) {
				// here we need to manually attach or detach Transformer node
				const stage = transformerRef.current.getStage()
				const selectedNode = stage.findOne(`.${selectedShapeName}`)
				// do nothing if selected node is already attached
				if (selectedNode === transformerRef.current.node()) {
					return
				}
				if (selectedNode) {
					// attach to another node
					transformerRef.current.attachTo(selectedNode)
				} else {
					// remove transformer
					transformerRef.current.detach()
				}
				transformerRef.current.getLayer().batchDraw()
			}
		},
		[selectedShapeName]
	)

	const dragOnHorizontally = useCallback(function(pos) {
		return {
			x: pos.x,
			y: this.getAbsolutePosition().y
		}
	}, [])

	const handleStageMouseDown = useCallback(function(e) {
		// clicked on <Stage /> - clear selection
		if (e.target === e.target.getStage()) {
			setSelectedShapeName('')
			return
		}
		// clicked on transformer - do nothing
		const clickedOnTransformer =
			e.target.getParent().className === 'Transformer'
		if (clickedOnTransformer) {
			return
		}

		const name = e.target.name()
		console.log({ name })

		if (name === 'background-image') {
			transformerRef.current.detach()
			setSelectedShapeName('')
		} else {
			setSelectedShapeName(name)
		}
	}, [])

	return (
		<Stage
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
